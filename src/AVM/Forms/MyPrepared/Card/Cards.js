// ======================================================================================== [Import Libaray]


// ======================================================================================== [Import Material UI Libaray]

//icon

// ======================================================================================== [Import Component] js
// its lang Object


// external page
import NoCardVeiw from '../../../../System/RedirectPage/NoCardView/NoCardVeiw'

// ======================================================================================== [Import Component] CSS

function Cards () {

    return (
        <div id = 'userTableView' style ={{ display : 'flex', flexDirection : 'column'}} >
            <div style ={{ width : '100wv', display : 'flex', flexDirection : 'row', justifyContent : 'center' }}>
            </div>
            <NoCardVeiw/>
        </div>      
    )
}

export default Cards;