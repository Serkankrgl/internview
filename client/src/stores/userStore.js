import { createSlice } from '@reduxjs/toolkit';
import { setApplication } from './advertisementStore';

const initialState = {
   resume: {},
   applications: [
      {
         _id: {
            $oid: '6453d97fa656f6c72ab473bc'
         },
         title: 'İş İlanı - 1',
         company: 'Internview',
         company_info: 'Görntülü Mülakat Dijital Çözümler.',
         companyURL: null,
         location: 'Sakarya',
         role: 'Yazılımcı',
         seniority: 'junior',
         employment_type: 'Tam Zamanlı',
         description:
            'Görüntülü online mülakat sitemi hakkında merakli kendini geliştirmeye açık. Askerliğini yapmış.',
         requirement: ['Test Gereksinim-1', 'TeTest Gereksinim-2', 'Test Gereksinim-3'],
         custom_question: [
            { Q: 'Test Soru-1', A: 'Test Cevap-1' },
            { Q: 'Test Soru-2', A: 'Test Cevap-2' },
            { Q: 'Test Soru-1', A: 'Test Cevap-1' },
            { Q: 'Test Soru-2', A: 'Test Cevap-2' }
         ],
         problems: [
            {
               problem: {
                  name: 'Test problem-1',
                  _id: {
                     $oid: '6453d97fa656f6c72ab4732c'
                  }
               },
               statu: 'Tamamlandı.'
            },
            {
               problem: {
                  name: 'Test problem-2',
                  _id: {
                     $oid: '6453d97fa656f6c72ab4732c'
                  }
               },
               statu: 'Tamamlandı.'
            }
         ],
         createdAt: {
            $date: '2023-05-04T16:12:47.058Z'
         },
         updatedAt: {
            $date: '2023-05-04T16:12:47.058Z'
         }
      },
      {
         _id: {
            $oid: '6453d97fa656f6c72ab473bc'
         },
         title: 'Beni senden mahrum etme ne olur',
         company: 'Sevdalılar Beni Anlalar',
         company_info: 'Bul beni kaybolmuşum ',
         companyURL: null,
         location: 'İtsanbul',
         role: 'Yazılımcı',
         seniority: 'Çırak',
         employment_type: 'Yarı Zamanlı',
         description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
         requirement: ['Test Gereksinim-1', 'TeTest Gereksinim-2', 'Test Gereksinim-3'],
         custom_question: [
            { Q: 'Test Soru-1', A: 'Test Cevap-1' },
            { Q: 'Test Soru-2', A: 'Test Cevap-2' }
         ],
         problems: [
            {
               problem: {
                  name: 'Test problem-1',
                  _id: {
                     $oid: '6453d97fa656f6c72ab4732c'
                  }
               },
               statu: 'Tamamlandı.'
            },
            {
               problem: {
                  name: 'Test problem-1',
                  _id: {
                     $oid: '6453d97fa656f6c72ab4732c'
                  }
               },
               statu: 'Tamamlandı.'
            }
         ],
         createdAt: {
            $date: '2023-05-04T16:12:47.058Z'
         },
         updatedAt: {
            $date: '2023-05-04T16:12:47.058Z'
         }
      }
   ]
};

const userStore = createSlice({
   name: 'userStore',
   initialState,
   reducers: {
      setResume: (state, payload) => {
         state.resume = payload.payload;
      },
      setApplications: (state, payload) => {
         state.applications = payload.payload;
      }
   }
});

export const { setResume, setApplications } = userStore.actions;
export default userStore.reducer;
