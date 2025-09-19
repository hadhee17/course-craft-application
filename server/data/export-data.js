const fs = require('fs');
const path = require('path');
const connectDB = require('../config/DB');

const CourseModel = require('../../model/courseModel');
const ModuleModel = require('../../model/moduleModel');
const LessonModel = require('../../model/lessonsModel');
const courseModel = require('../../model/courseModel');
const moduleModel = require('../../model/moduleModel');

const exportDataToDB = async () => {
  try {
    await connectDB();

    // delete existing data before inserting
    await CourseModel.deleteMany();
    await ModuleModel.deleteMany();
    await LessonModel.deleteMany();

    const courseData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'course.json'), 'utf-8'),
    );

    await CourseModel.insertMany(courseData);

    const moduleDataRaw = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'modules.json'), 'utf-8'),
    );
    const lessonDataRaw = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'lessons.json'), 'utf-8'),
    );

    const savedModules = await ModuleModel.insertMany(moduleDataRaw);

    // Step 4: Insert lessons (and reference module by title)
    const lessonData = lessonDataRaw.map((lesson) => {
      const matchedModule = savedModules.find(
        (mod) => mod.title === lesson.moduleTitle,
      );

      return {
        title: lesson.title,
        content: lesson.content,
        duration: lesson.duration,
        module: matchedModule ? matchedModule._id : null,
      };
    });

    const savedLessons = await LessonModel.insertMany(lessonData);

    for (const modules of savedModules) {
      const relatedLessons = savedLessons.filter(
        (lesson) => lesson.module?.toString() === modules._id.toString(),
      );

      modules.lessons = relatedLessons.map((l) => l._id);
      await modules.save();
    }

    console.log('data seeded successfully to DB');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteDataFromDB = async () => {
  try {
    await connectDB();

    await courseModel.deleteMany();
    await moduleModel.deleteMany();
    await LessonModel.deleteMany();

    console.log('data seed deleted successfully from DB');
    process.exit();
  } catch (error) {
    console.log(`coudnt delete dat from DB ${error}`);
  }
};

if (process.argv[2] === '--export') {
  exportDataToDB();
} else if (process.argv[2] == '--delete') {
  deleteDataFromDB();
}
