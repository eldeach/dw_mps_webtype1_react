const langConfig = {
    alertMsg : {
        duplicated : {
            kor : "이 항목은 이미 추가되어 있습니다.",
            eng : "This item has already been added."
        }
    },
    inputField :{
        email_address : {
            placeholder : {
                kor : "이메일 주소",
                eng : "Email Address"
            },
            valMsg : {
                required : {
                    kor : "사용자 이메일을 입력해주세요.",
                    eng : "Please enter user email address."
                },
                pattern : {
                    kor : "올바른 형식의 이메일을 입력해주세요. (example@ex.com)",
                    eng : "Please enter a valid email address. (example@ex.com)"
                }
            }
        },
        email_usage : {
            placeholder :{
                kor : "이메일 용도",
                eng : "Email Usage"
            },
            optionLabel:{
                personal:{
                    kor : "개인",
                    eng : "Personal"
                },
                work:{
                    kor : "업무",
                    eng : "Work"
                },
                other:{
                    kor : "기타",
                    eng : "Other"
                }
            }
        },
        email_affiliation : {
            placeholder :{
                kor : "이메일 소속 (선택사항)",
                eng : "Email Affiliation (Optional)"
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