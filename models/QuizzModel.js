const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const quizzSchema = new Schema(
  {
    content: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'Unknow',
    },
    public_time_format: {
      type: Schema.Types.Date,
      default: null,
    },
    public_time: {
      type: String,
      default: null,
    },
    root_source: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    questions: [
      {
        answers: {
          type: Array,
          required: true,
        },
        correct_answer: {
          type: String,
          required: true,
        },
        explain: {
          type: String,
          default: '',
        },
        img: {
          alt: {
            type: String,
            default: '',
          },
          title: {
            type: String,
            default: '',
          },
          url: {
            type: String,
            default: '',
          },
        },
        num: {
          type: Number,
          default: null,
        },
        question: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

quizzSchema.methods.toJSON = function () {
  const quizz = this;
  const quizzOb = quizz.toObject();
  quizzOb.id = quizzOb._id;
  delete quizzOb._id;
  return quizzOb;
};

const QuizzModel = model('Quizz', quizzSchema);
module.exports = QuizzModel;
