const prmCodeBook = {
    prm_batchsize : {
        kor : `최악 배치 사이즈 [T]`,
        eng : `Worst Batch Size [T]`,
        value : {
            min_value : {
                kor : `최악 배치 사이즈 [T] 최소`,
                eng : `Worst Batch Size [T] Min`,
            },
            max_value : {
                kor : `최악 배치 사이즈 [T] 최대`,
                eng : `Worst Batch Size [T] Max`,
            },
        }
    },
    prm_batchsize_kg : {
        kor : `최악 배치 사이즈 [kg]`,
        eng : `Worst Batch Size [kg]`,
        value : {
            min_value : {
                kor : `최악 배치 사이즈 [kg] 최소`,
                eng : `Worst Batch Size [kg] Min`,
            },
            max_value : {
                kor : `최악 배치 사이즈 [kg] 최대`,
                eng : `Worst Batch Size [kg] Max`,
            },
        }
    },
    prm_batchsize_vial : {
        kor : `최악 배치 사이즈 [Vial]`,
        eng : `Worst Batch Size [Vial]`,
        value : {
            min_value : {
                kor : `최악 배치 사이즈 [Vial] 최소`,
                eng : `Worst Batch Size [Vial] Min`,
            },
            max_value : {
                kor : `최악 배치 사이즈 [Vial] 최대`,
                eng : `Worst Batch Size [Vial] Max`,
            },
        }
    },
    prm_batchsize_syringe : {
        kor : `최악 배치 사이즈 [Syringe]`,
        eng : `Worst Batch Size [Syringe]`,
        value : {
            min_value : {
                kor : `최악 배치 사이즈 [Syringe] 최소`,
                eng : `Worst Batch Size [Syringe] Min`,
            },
            max_value : {
                kor : `최악 배치 사이즈 [Syringe] 최대`,
                eng : `Worst Batch Size [Syringe] Max`,
            },
        }
    },
    prm_gentlewing : {
        kor : `GentleWing Speed [RPM]`,
        eng : `GentleWing Speed [RPM]`,
        value : {
            min_value : {
                kor : `GentleWing Speed [RPM] 최소`,
                eng : `GentleWing Speed [RPM] Min`,
            },
            max_value : {
                kor : `GentleWing Speed [RPM] 최대`,
                eng : `GentleWing Speed [RPM] Max`,
            },
        }
    },
    prm_chopper : {
        kor : `Chopper Speed [RPM]`,
        eng : `Chopper Speed [RPM]`,
        value : {
            min_value : {
                kor : `Chopper Speed [RPM] 최소`,
                eng : `Chopper Speed [RPM] Min`,
            },
            max_value : {
                kor : `Chopper Speed [RPM] 최대`,
                eng : `Chopper Speed [RPM] Max`,
            },
        }
    },
    prm_spray : {
        kor : `Spray Rate [ml/min]`,
        eng : `Spray Rate [ml/min]`,
        value : {
            min_value : {
                kor : `Spray Rate [ml/min] 최소`,
                eng : `Spray Rate [ml/min] Min`,
            },
            max_value : {
                kor : `Spray Rate [ml/min] 최대`,
                eng : `Spray Rate [ml/min] Max`,
            },
        }
    },
    prm_spray_kgmin : {
        kor : `Spray Rate [kg/min]`,
        eng : `Spray Rate [kg/min]`,
        value : {
            min_value : {
                kor : `Spray Rate [kg/min] 최소`,
                eng : `Spray Rate [kg/min] Min`,
            },
            max_value : {
                kor : `Spray Rate [kg/min] 최대`,
                eng : `Spray Rate [kg/min] Max`,
            },
        }
    },
    prm_spray_rpm : {
        kor : `Spray Rate [RPM]`,
        eng : `Spray Rate [RPM]`,
        value : {
            min_value : {
                kor : `Spray Rate [RPM] 최소`,
                eng : `Spray Rate [RPM] Min`,
            },
            max_value : {
                kor : `Spray Rate [RPM] 최대`,
                eng : `Spray Rate [RPM] Max`,
            },
        }
    },
    prm_gra_spray_air : {
        kor : `과립 Spray Air [Bar]`,
        eng : `Granulation Spray Air [Bar]`,
        value : {
            min_value : {
                kor : `과립 Spray Air [Bar] 최소`,
                eng : `Granulation Spray Air [Bar] Min`,
            },
            max_value : {
                kor : `과립 Spray Air [Bar] 최대`,
                eng : `Granulation Spray Air [Bar] Max`,
            },
        }
    },
    prm_gra_micro_prs : {
        kor : `과립 Microclimate Pressure [mBar]`,
        eng : `Granulation Microclimate Pressure [mBar]`,
        value : {
            min_value : {
                kor : `과립 Microclimate Pressure [mBar] 최소`,
                eng : `Granulation Microclimate Pressure [mBar] Min`,
            },
            max_value : {
                kor : `과립 Microclimate Pressure [mBar] 최대`,
                eng : `Granulation Microclimate Pressure [mBar] Max`,
            },
        }
    },
    prm_inlet_air_temp : {
        kor : `급기온도 [℃]`,
        eng : `Inlet Air Temperature [℃]`,
        value : {
            min_value : {
                kor : `급기온도 [℃] 최소`,
                eng : `Inlet Air Temperature [℃] Min`,
            },
            max_value : {
                kor : `급기온도 [℃] 최대`,
                eng : `Inlet Air Temperature [℃] Max`,
            },
        }
    },
    prm_exh_air_temp : {
        kor : `배기온도 [℃]`,
        eng : `Exhaust Air Temperature [℃]`,
        value : {
            min_value : {
                kor : `배기온도 [℃] 최소`,
                eng : `Exhaust Air Temperature [℃] Min`,
            },
            max_value : {
                kor : `배기온도 [℃] 최대`,
                eng : `Exhaust Air Temperature [℃] Max`,
            },
        }
    },
    prm_inlet_air_vol : {
        kor : `급기풍량 [CMH]`,
        eng : `Inlet Air Volume [CMH]`,
        value : {
            min_value : {
                kor : `급기풍량 [CMH] 최소`,
                eng : `Inlet Air Volume [CMH] Min`,
            },
            max_value : {
                kor : `급기풍량 [CMH] 최대`,
                eng : `Inlet Air Volume [CMH] Max`,
            },
        }
    },
    prm_inlet_air_vol_rpm : {
        kor : `급기풍량 [RPM]`,
        eng : `Inlet Air Volume [RPM]`,
        value : {
            min_value : {
                kor : `급기풍량 [RPM] 최소`,
                eng : `Inlet Air Volume [RPM] Min`,
            },
            max_value : {
                kor : `급기풍량 [RPM] 최대`,
                eng : `Inlet Air Volume [RPM] Max`,
            },
        }
    },
    prm_exh_air_vol_rpm : {
        kor : `배기풍량 [RPM]`,
        eng : `Exhaust Air Volume [RPM]`,
        value : {
            min_value : {
                kor : `배기풍량 [RPM] 최소`,
                eng : `Exhaust Air Volume [RPM] Min`,
            },
            max_value : {
                kor : `배기풍량 [RPM] 최대`,
                eng : `Exhaust Air Volume [RPM] Max`,
            },
        }
    },
    prm_roller_speed : {
        kor : `Roller Speed [RPM]`,
        eng : `Roller Speed [RPM]`,
        value : {
            min_value : {
                kor : `Roller Speed [RPM] 최소`,
                eng : `Roller Speed [RPM] Min`,
            },
            max_value : {
                kor : `Roller Speed [RPM] 최대`,
                eng : `Roller Speed [RPM] Max`,
            },
        }
    },
    prm_roller_gap : {
        kor : `Roller Gap [mm]`,
        eng : `Roller Gap [mm]`,
        value : {
            min_value : {
                kor : `Roller Gap [mm] 최소`,
                eng : `Roller Gap [mm] Min`,
            },
            max_value : {
                kor : `Roller Gap [mm] 최대`,
                eng : `Roller Gap [mm] Max`,
            },
        }
    },
    prm_grate : {
        kor : `정립 속도 [RPM]`,
        eng : `Grating Speed [RPM]`,
        value : {
            min_value : {
                kor : `정립 속도 [RPM] 최소`,
                eng : `Grating Speed [RPM] Min`,
            },
            max_value : {
                kor : `정립 속도 [RPM] 최대`,
                eng : `Grating Speed [RPM] Max`,
            },
        }
    },
    prm_blendrpm : {
        kor : `혼합 속도 [RPM]`,
        eng : `Blending Speed [RPM]`,
        value : {
            min_value : {
                kor : `혼합 속도 [RPM] 최소`,
                eng : `Blending Speed [RPM] Min`,
            },
            max_value : {
                kor : `혼합 속도 [RPM] 최대`,
                eng : `Blending Speed [RPM] Max`,
            },
        }
    },
    prm_filling_depth : {
        kor : `Filling Depth [mm]`,
        eng : `Filling Depth [mm]`,
        value : {
            min_value : {
                kor : `Filling Depth [mm] 최소`,
                eng : `Filling Depth [mm] Min`,
            },
            max_value : {
                kor : `Filling Depth [mm] 최대`,
                eng : `Filling Depth [mm] Max`,
            },
        }
    },
    prm_cforece : {
        kor : `Roller Compact Force [kN/cm]`,
        eng : `Roller Compact Force [kN/cm]`,
        value : {
            min_value : {
                kor : `Roller Compact Force [kN/cm] 최소`,
                eng : `Roller Compact Force [kN/cm] Min`,
            },
            max_value : {
                kor : `Roller Compact Force [kN/cm] 최대`,
                eng : `Roller Compact Force [kN/cm] Max`,
            },
        }
    },
    prm_turret : {
        kor : `Turret 속도 [RPM]`,
        eng : `Turret Speed [RPM]`,
        value : {
            min_value : {
                kor : `Turret 속도 [RPM] 최소`,
                eng : `Turret Speed [RPM] Min`,
            },
            max_value : {
                kor : `Turret 속도 [RPM] 최대`,
                eng : `Turret Speed [RPM] Max`,
            },
        }
    },
    prm_feeder : {
        kor : `Feeder 속도 [RPM]`,
        eng : `Feeder Speed [RPM]`,
        value : {
            min_value : {
                kor : `Feeder 속도 [RPM] 최소`,
                eng : `Feeder Speed [RPM] Min`,
            },
            max_value : {
                kor : `Feeder 속도 [RPM] 최대`,
                eng : `Feeder Speed [RPM] Max`,
            },
        }
    },
    prm_feeder_2nd : {
        kor : `2차 Feeder 속도 [RPM]`,
        eng : `2nd Feeder Speed [RPM]`,
        value : {
            min_value : {
                kor : `2차 Feeder 속도 [RPM] 최소`,
                eng : `2nd Feeder Speed [RPM] Min`,
            },
            max_value : {
                kor : `2차 Feeder 속도 [RPM] 최대`,
                eng : `2nd Feeder Speed [RPM] Max`,
            },
        }
    },
    prm_pforce : {
        kor : `예압 [kN]`,
        eng : `Pre. Pressure Force [kN]`,
        value : {
            min_value : {
                kor : `예압 [kN] 최소`,
                eng : `Pre. Pressure Force [kN] Min`,
            },
            max_value : {
                kor : `예압 [kN] 최대`,
                eng : `Pre. Pressure Force [kN] Max`,
            },
        }
    },
    prm_mforce : {
        kor : `본압 [kN]`,
        eng : `Main Pressure Force [kN]`,
        value : {
            min_value : {
                kor : `본압 [kN] 최소`,
                eng : `Main Pressure Force [kN] Min`,
            },
            max_value : {
                kor : `본압 [kN] 최대`,
                eng : `Main Pressure Force [kN] Max`,
            },
        }
    },
    prm_pforce_2nd : {
        kor : `2차 예압 [kN]`,
        eng : `2nd Pre. Pressure Force [kN]`,
        value : {
            min_value : {
                kor : `2차 예압 [kN] 최소`,
                eng : `2nd Pre. Pressure Force [kN] Min`,
            },
            max_value : {
                kor : `2차 예압 [kN] 최대`,
                eng : `2nd Pre. Pressure Force [kN] Max`,
            },
        }
    },
    prm_mforce_2nd : {
        kor : `2차 본압 [kN]`,
        eng : `2nd Main Pressure Force [kN]`,
        value : {
            min_value : {
                kor : `2차 본압 [kN] 최소`,
                eng : `2nd Main Pressure Force [kN] Min`,
            },
            max_value : {
                kor : `2차 본압 [kN] 최대`,
                eng : `2nd Main Pressure Force [kN] Max`,
            },
        }
    },
    prm_pforce_kgf : {
        kor : `예압 [kgf]`,
        eng : `Pre. Pressure Force [kgf]`,
        value : {
            min_value : {
                kor : `예압 [kgf] 최소`,
                eng : `Pre. Pressure Force [kgf] Min`,
            },
            max_value : {
                kor : `예압 [kgf] 최대`,
                eng : `Pre. Pressure Force [kgf] Max`,
            },
        }
    },
    prm_mforce_kgf : {
        kor : `본압 [kgf]`,
        eng : `Main Pressure Force [kgf]`,
        value : {
            min_value : {
                kor : `본압 [kgf] 최소`,
                eng : `Main Pressure Force [kgf] Min`,
            },
            max_value : {
                kor : `본압 [kgf] 최대`,
                eng : `Main Pressure Force [kgf] Max`,
            },
        }
    },
    prm_drum : {
        kor : `코팅팬 속도 [RPM]`,
        eng : `Coating Drum Speed [RPM]`,
        value : {
            min_value : {
                kor : `코팅팬 속도 [RPM] 최소`,
                eng : `Coating Drum Speed [RPM] Min`,
            },
            max_value : {
                kor : `코팅팬 속도 [RPM] 최대`,
                eng : `Coating Drum Speed [RPM] Max`,
            },
        }
    },
    prm_paair : {
        kor : `Pattern Air [Bar]`,
        eng : `Pattern Air [Bar]`,
        value : {
            min_value : {
                kor : `Pattern Air [Bar] 최소`,
                eng : `Pattern Air [Bar] Min`,
            },
            max_value : {
                kor : `Pattern Air [Bar] 최대`,
                eng : `Pattern Air [Bar] Max Max`,
            },
        }
    },
    prm_atair : {
        kor : `Atomizing Air [Bar]`,
        eng : `Atomizing Air [Bar]`,
        value : {
            min_value : {
                kor : `Atomizing Air [Bar] 최소`,
                eng : `Atomizing Air [Bar] Min`,
            },
            max_value : {
                kor : `Atomizing Air [Bar] 최대`,
                eng : `Atomizing Air [Bar] Max`,
            },
        }
    },
    prm_fill : {
        kor : `충전량 [mg]`,
        eng : `Filling amount [mg]`,
        value : {
            min_value : {
                kor : `충전량 [mg] 최소`,
                eng : `Filling amount [mg] Min`,
            },
            max_value : {
                kor : `충전량 [mg] 최대`,
                eng : `Filling amount [mg] Max`,
            },
        }
    },
    prm_timer : {
        kor : `타이머 [min]`,
        eng : `Timer [min]`,
        value : {
            min_value : {
                kor : `타이머 [min] 최소`,
                eng : `Timer [min] Min`,
            },
            max_value : {
                kor : `타이머 [min] 최대`,
                eng : `Timer [min] Max`,
            },
        }
    },
}

export default prmCodeBook;