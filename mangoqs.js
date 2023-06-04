1.Find all the topics and tasks taught in the month of October:

db.topics.aggregate([
    {
       $lookup:
          {
            from: "tasks",
            localField: "topic_id",
            foreignField: "topic_id",
            as: "tasks"
          }
    },
    {
       $match:
          {
            "tasks.date_submitted":
              {
                $gte: ISODate("2020-10-01"),
                $lte: ISODate("2020-10-31")
              }
          }
    }
 ])

 2.Find all the company drives that appeared between 15th October 2020 and 31st October 2020:

 db.company_drives.find({
    date: {
       $gte: ISODate("2020-10-15"),
       $lte: ISODate("2020-10-31")
    }
 })
 
 3.Find all the company drives and students who appeared for the placement:

 db.company_drives.aggregate([
    {
       $lookup:
          {
            from: "users",
            localField: "drive_id",
            foreignField: "drive_id",
            as: "students"
          }
    }
 ])
 
 4.Find the number of problems solved by a user in codekata:

 db.codekata.count({ user_id: "<user_id>" })

 5.Find all the mentors who have a mentee count greater than 15:

 db.mentors.find({ mentee_count: { $gt: 15 } })

 6.Find the number of users who were absent and task was not submitted between 15th October 2020 and 31st October 2020:

 db.users.count({
    $and: [
       { "attendance.date": { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") } },
       { "attendance.status": "absent" },
       { "tasks.date_submitted": { $exists: false } }
    ]
 })
 