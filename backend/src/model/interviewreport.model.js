import mongoose from "mongoose"

// setup AI support
const technicalQuestionInterviewSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is nrequired"]
    },
    intension: {
        type: String,
        required: [true, "intension  is nrequired"]
    },
    answer: {
        type: String,
        required: [true, "Answer is nrequired"]
    }
}, {
    _id: false
})
const BehaberialQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behaberial question is required"]
    },
    intension: {
        type: String,
        required: [true, "intension  is nrequired"]
    },
    answer: {
        type: String,
        required: [true, "Answer is nrequired"]
    }

}, {
    _id: false
})

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    sevarity: {
        type: String,
        enum: ["low", "medium", "hard"],
        required: [true, "Sevarity is required"]
    }
}, { _id: false })

const preparaqtionPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [
        {
            type: String,
            required: [true, "Task is required"]
        }
    ]
},{_id:false})
const interViweReportSchema = new mongoose.Schema({
    jobDecsription: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [
        technicalQuestionInterview
    ],
    bhavioralQuestions: [BehaberialQuestionSchema],
    skillGap:[skillGapsSchema],
    preparationPlan:[preparaqtionPlanSchema]
}, { timestamps: true })

const interviweReportModel=mongoose.model("InterviewReport",interViweReportSchema)
export default interviweReportModel