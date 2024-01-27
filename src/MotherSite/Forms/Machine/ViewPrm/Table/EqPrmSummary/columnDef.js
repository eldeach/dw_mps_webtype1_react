// ======================================================================================== [Import Libaray]
import { createColumnHelper } from "@tanstack/react-table";
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
//icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircleIcon from '@mui/icons-material/Circle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// ======================================================================================== [Import Component] js
// Component Object
import prmCodeBook from '../../../../../Component/CodeBook/prmCodeBook'

// ======================================================================================== [Import Component] CSS

    
const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    columnHelper.accessor( "data_ver",
        {
            header: { kor : "Data Ver", eng : "Data Ver" },
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "data_sub_ver",
        {
            header: { kor : "Data Sub Ver", eng : "Data Sub Ver" },
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "mng_code",
        {
            header: { kor : "설비/시스템 관리코드", eng : "Machine/System management code" },
            size: 150,
            enableColumnFilter: true,
            // cell: ({ row }) => (<button onClick={(e) => console.log(row.original)}>Click Me</button>),
        }
    ),
    columnHelper.accessor( "mng_name",
        {
            header: { kor : "설비/시스템 명칭", eng : "Machine/System name" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "mng_team",
        {
            header: { kor : "관리팀", eng : "Management team" },
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_batchsize_min_value",
        {
            header: prmCodeBook.prm_batchsize.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_batchsize_max_value",
        {
            header: prmCodeBook.prm_batchsize.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_batchsize_kg_min_value",
        {
            header: prmCodeBook.prm_batchsize_kg.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_batchsize_kg_max_value",
        {
            header: prmCodeBook.prm_batchsize_kg.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_gentlewing_min_value",
        {
            header: prmCodeBook.prm_gentlewing.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_gentlewing_max_value",
        {
            header: prmCodeBook.prm_gentlewing.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_chopper_min_value",
        {
            header: prmCodeBook.prm_chopper.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_chopper_max_value",
        {
            header: prmCodeBook.prm_chopper.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_spray_min_value",
        {
            header: prmCodeBook.prm_spray.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_spray_max_value",
        {
            header: prmCodeBook.prm_spray.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_spray_kgmin_min_value",
        {
            header: prmCodeBook.prm_spray_kgmin.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_spray_kgmin_max_value",
        {
            header: prmCodeBook.prm_spray_kgmin.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_spray_rpm_min_value",
        {
            header: prmCodeBook.prm_spray_rpm.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_spray_rpm_max_value",
        {
            header: prmCodeBook.prm_spray_rpm.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_gra_spray_air_min_value",
        {
            header: prmCodeBook.prm_gra_spray_air.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_gra_spray_air_max_value",
        {
            header: prmCodeBook.prm_gra_spray_air.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_gra_micro_prs_min_value",
        {
            header: prmCodeBook.prm_gra_micro_prs.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_gra_micro_prs_max_value",
        {
            header: prmCodeBook.prm_gra_micro_prs.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_temp_min_value",
        {
            header: prmCodeBook.prm_inlet_air_temp.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_temp_max_value",
        {
            header: prmCodeBook.prm_inlet_air_temp.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_exh_air_temp_min_value",
        {
            header: prmCodeBook.prm_exh_air_temp.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_exh_air_temp_max_value",
        {
            header: prmCodeBook.prm_exh_air_temp.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_vol_min_value",
        {
            header: prmCodeBook.prm_inlet_air_vol.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_vol_max_value",
        {
            header: prmCodeBook.prm_inlet_air_vol.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_vol_rpm_min_value",
        {
            header: prmCodeBook.prm_inlet_air_vol_rpm.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_inlet_air_vol_rpm_max_value",
        {
            header: prmCodeBook.prm_inlet_air_vol_rpm.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_roller_speed_min_value",
        {
            header: prmCodeBook.prm_roller_speed.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_roller_speed_max_value",
        {
            header: prmCodeBook.prm_roller_speed.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_roller_gap_min_value",
        {
            header: prmCodeBook.prm_roller_gap.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_roller_gap_max_value",
        {
            header: prmCodeBook.prm_roller_gap.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_grate_min_value",
        {
            header: prmCodeBook.prm_grate.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_grate_max_value",
        {
            header: prmCodeBook.prm_grate.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_blendrpm_min_value",
        {
            header: prmCodeBook.prm_blendrpm.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_blendrpm_max_value",
        {
            header: prmCodeBook.prm_blendrpm.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_filling_depth_min_value",
        {
            header: prmCodeBook.prm_filling_depth.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_filling_depth_max_value",
        {
            header: prmCodeBook.prm_filling_depth.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_cforece_min_value",
        {
            header: prmCodeBook.prm_cforece.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_cforece_max_value",
        {
            header: prmCodeBook.prm_cforece.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_feeder_min_value",
        {
            header: prmCodeBook.prm_feeder.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_feeder_max_value",
        {
            header: prmCodeBook.prm_feeder.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_feeder_2nd_min_value",
        {
            header: prmCodeBook.prm_feeder_2nd.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_feeder_2nd_max_value",
        {
            header: prmCodeBook.prm_feeder_2nd.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_turret_min_value",
        {
            header: prmCodeBook.prm_turret.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_turret_max_value",
        {
            header: prmCodeBook.prm_turret.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_pforce_min_value",
        {
            header: prmCodeBook.prm_pforce.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_pforce_max_value",
        {
            header: prmCodeBook.prm_pforce.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_mforce_min_value",
        {
            header: prmCodeBook.prm_mforce.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_mforce_max_value",
        {
            header: prmCodeBook.prm_mforce.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_pforce_2nd_min_value",
        {
            header: prmCodeBook.prm_pforce_2nd.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_pforce_2nd_max_value",
        {
            header: prmCodeBook.prm_pforce_2nd.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_mforce_2nd_min_value",
        {
            header: prmCodeBook.prm_mforce_2nd.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_mforce_2nd_max_value",
        {
            header: prmCodeBook.prm_mforce_2nd.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_pforce_kgf_min_value",
        {
            header: prmCodeBook.prm_pforce_kgf.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_pforce_kgf_max_value",
        {
            header: prmCodeBook.prm_pforce_kgf.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_mforce_kgf_min_value",
        {
            header: prmCodeBook.prm_mforce_kgf.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_mforce_kgf_max_value",
        {
            header: prmCodeBook.prm_mforce_kgf.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_drum_min_value",
        {
            header: prmCodeBook.prm_drum.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_drum_max_value",
        {
            header: prmCodeBook.prm_drum.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_paair_min_value",
        {
            header: prmCodeBook.prm_paair.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_paair_max_value",
        {
            header: prmCodeBook.prm_paair.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_atair_min_value",
        {
            header: prmCodeBook.prm_atair.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_atair_max_value",
        {
            header: prmCodeBook.prm_atair.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    
    columnHelper.accessor( "prm_fill_min_value",
        {
            header: prmCodeBook.prm_fill.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_fill_max_value",
        {
            header: prmCodeBook.prm_fill.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_timer_min_value",
        {
            header: prmCodeBook.prm_timer.value.min_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor( "prm_timer_max_value",
        {
            header: prmCodeBook.prm_timer.value.max_value,
            size: 80,
            enableColumnFilter: true,
        }
    ),

]

export default columnDef;