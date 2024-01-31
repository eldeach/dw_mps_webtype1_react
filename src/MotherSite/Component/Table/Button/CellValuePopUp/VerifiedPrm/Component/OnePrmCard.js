// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies';


// ======================================================================================== [Import Material UI Libaray]
import GetPrmDocs from '../../GetPrmDocs/GetPrmDocs'

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS

function OnePrmCard(props) {
    const {
        prmIcon, prmName, minValue, maxValue,
        prm_tbl_name, prm_id_col_name, mng_code, data_ver
    } = props

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '360px', margin: '5px' }}>
            <div className='verified_prm_label'>
                <div className='verified_prm_label_icon'>
                    {prmIcon}
                </div>
                <div className='verified_prm_label_text'>
                    {prmName}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', marginBottom: '2px', border: '1px solid grey', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '180px', borderRight: '1px solid grey' }}>
                    <div style={{ textAlign: 'center', backgroundColor: '#c2c2c2' }}>
                        {{ kor: '최소값', eng: 'min. Value' }[cookies.load('site-lang')]}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {minValue}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '180px' }}>
                    <div style={{ textAlign: 'center', backgroundColor: '#c2c2c2' }}>
                        {{ kor: '최대값', eng: 'Max. Value' }[cookies.load('site-lang')]}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {maxValue}
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div style={{ flexGrow: 1 }} />
                <GetPrmDocs
                    prmIcon = {prmIcon}
                    prmName = {prmName}
                    prm_tbl_name={prm_tbl_name}
                    prm_id_col_name={prm_id_col_name}
                    mng_code={mng_code}
                    data_ver={data_ver}
                />
            </div>
        </div>
    )
}

export default OnePrmCard;