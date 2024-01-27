const langConfig = {
    alertMsg : {
        duplicated : {
            kor : "이 항목은 이미 추가되어 있습니다.",
            eng : "This item has already been added."
        }
    },
    formTitle : {
        kor : "설비 시스템 추가",
        eng : "Add Machine System"
    },
    allFoldButton : {
        kor : "모두 접기",
        eng : "Fold everything"
    },
    allUnfoldButton : {
        kor : "모두 펼치기",
        eng : "Unfold everything"
    },
    fold : {
        kor : "접기",
        eng : "Fold"
    },
    unfold : {
        kor : "펼치기",
        eng : "Unfold"
    },
    mcInfoPaper : {
        inputField : {
            mng_code:{
                placeholder : {
                    kor : "관리코드",
                    eng : "Management code"
                },
                valMsg : {
                    required : {
                        kor : "설비코드를 입력해주세요.",
                        eng : "Please enter management code."
                    }
                }
            },
            mng_code_alt : {
                placeholder : {
                    kor : "대체 설비코드",
                    eng : "Alternative management code"
                },
            },
            mng_code_alt2 : {
                placeholder : {
                    kor : "두번째 대체 설비코드",
                    eng : "2nd alternative management code"
                },
            },
            mng_name : {
                placeholder : {
                    kor : "설비 시스템 명칭",
                    eng : "Machine System name"
                },
                valMsg : {
                    required : {
                        kor : "설비 시스템 명칭을 입력해주세요.",
                        eng : "Please enter management name."
                    }
                }
            },
            mng_team : {
                placeholder : {
                    kor : "관리팀",
                    eng : "Management team"
                },
                valMsg : {
                    required : {
                        kor : "관리 팀을 입력해주세요.",
                        eng : "Please enter management team."
                    }
                }
            },
            revision_history : {
                placeholder : {
                    kor : "제/개정이력",
                    eng : "Revision History"
                },
            },
            machine_type : {
                placeholder : {
                    kor : "설비/시스템 유형",
                    eng : "Machine/System Type"
                },
                eq : {
                    kor : "설비",
                    eng : "Equipment"
                },
                room : {
                    kor : "Room",
                    eng : "Room"
                },
                com : {
                    kor : "컴퓨터화 시스템",
                    eng : "Computerized Sytem"
                }
            },
            not_in_use : {
                placeholder : {
                    kor : "사용현황",
                    eng : "Usage Status"
                },
                in_use : {
                    kor : "사용 중",
                    eng : "In Use"
                },
                not_in_use : {
                    kor : "미사용 중",
                    eng : "Not In Use"
                },
                discarded : {
                    kor : "폐기됨",
                    eng : "Discarded"
                }
            }
        },
        checkbox : {
            periodic_mng_1y_qual : {
                kor : '1년 정기적 재적격성 평가',
                eng : 'Annual Periodic Re-Qual'
            },
            periodic_mng_qual : {
                kor : '정기적 재적격성 평가',
                eng : 'Periodic Re-Qual'
            },
            periodic_mng_ster : {
                kor : '정기적 멸균 재적격성 평가',
                eng : 'Periodic Sterilization Re-Qual'
            },
            periodic_mng_vhp : {
                kor : '정기적 VHP 재적격성 평가',
                eng : 'Periodic VHP Re-Qual'
            },
            periodic_mng_review : {
                kor : '정기적 검토',
                eng : 'Periodic Review'
            },
            periodic_mng_cv : {
                kor : '정기적 CV',
                eng : 'Periodic CV'
            },
            periodic_mng_1y_mt : {
                kor : '1년 정기적 Mapping Test',
                eng : 'Annual Periodic Mapping Test'
            },
            periodic_mng_mt : {
                kor : '정기적 Mapping Test',
                eng : 'Periodic Mapping Test'
            },
        }
    }
}

export default langConfig;