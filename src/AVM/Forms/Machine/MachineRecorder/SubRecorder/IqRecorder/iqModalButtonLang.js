const langConfig = {
    alertMsg : {
        duplicated : {
            kor : "이 항목은 이미 추가되어 있습니다.",
            eng : "This item has already been added."
        }
    },
    inputField :{
        doc_no : {
            placeholder :{
                kor : "문서번호",
                eng : "Document Number"
            },
            valMsg : {
                required : {
                    kor : "문서번호를 입력해주세요.",
                    eng : "Please enter document number."
                },
            }
        },
        doc_rev_no : {
            placeholder :{
                kor : "제개정번호",
                eng : "Revision Number"
            },
            valMsg : {
                required : {
                    kor : "제개정번호를 입력해주세요.",
                    eng : "Please enter revision number."
                },
            }
        },
        perform_date_start : {
            placeholder :{
                kor : "수행 시작일",
                eng : "Start date of execution"
            },
        },
        perform_date_end : {
            placeholder :{
                kor : "수행 종료일",
                eng : "End date of execution"
            },
        },
        doc_approval_date : {
            placeholder :{
                kor : "문서 승인일",
                eng : "Approval Date"
            },
            valMsg : {
                required : {
                    kor : "문서 승인일을 입력해주세요.",
                    eng : "Please enter effective date of document."
                },
            }
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