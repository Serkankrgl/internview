const Mongoose = require("mongoose");

const AdvertisementSchema = new Mongoose.Schema(
  {
    title: String,
    company: String,
    company_info: String,
    companyURL: String,
    location: String,
    role: String,
    seniority: String,
    employment_type: String,
    description: String,
    requirement: [String],
    custom_question: [String],
    problems: [String],
    ad_owner: String,
    ad_owner_id: Mongoose.Schema.Types.ObjectId,
  },
  { versionKey: false, timestamps: true }
);

// {
//             _id: 1,
//             title: ' Work with us 1Work with us 1Work with us 1',
//             company: 'Trendyol',
//             company_info:
//                'Trendyol, şirket olma zorunluluğu olan binlerce mağazanın bir araya gelerek satış yaptığı bir E-ticaret platformudur. Trendyol bu mağazaların satışlarından kategori bazlı komisyonlar alır. Ek olarak kargo şirketleri ile Mağaza adına anlaşmalar yaparak kargoların daha uygun fiyatlar üzerinden taşınmasını sağlar.',
//             companyURL: 'https://www.trendyol.com/',
//             location: 'Remote',
//             role: 'Software Dev.',
//             seniority: 'Senior',
//             employment_type: 'String',
//             description:
//                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//             requirement:
//                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//             ad_owner: 'String',
//             ad_owner_id: 'skuruogl'
//          }

// TODO: Kullanıcılar buraya task ekleyebilecek Task sistemi yazıldığında buraya ekle.

module.exports = Mongoose.model("advertisement", AdvertisementSchema);
