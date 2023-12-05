const langConfig = {
    alertMsg : {
        duplicated : {
            kor : "이 항목은 이미 추가되어 있습니다.",
            eng : "This item has already been added."
        }
    },
    inputField :{
        job_position : {
            placeholder :{
                kor : "직책명",
                eng : "Position Ttile"
            },
            valMsg : {
                required : {
                    kor : "사용자 직책명을 입력해주세요.",
                    eng : "Please enter user's job title."
                },
            }
        },
        job_team : {
            placeholder :{
                kor : "부서명",
                eng : "Department name"
            },
        },
        job_company : {
            placeholder :{
                kor : "회사명",
                eng : "Company Name"
            },
        },
        job_description : {
            placeholder :{
                kor : "업무설명",
                eng : "Job Description"
            },
        },
    },
    button : {
        subForm:{
            signIn:{
                kor:"추가",
                eng:"ADD"
            }
        }
    }
}

export default langConfig;