/**
 * Created by Xingyu on 6/29/2017.
 */
export const SET_SEEDS = 'SET_SEEDS';

export function setSeeds(seeds){
    return{
        type: SET_SEEDS,
        seeds
    }

}

export function fetchSeeds(){
    return dispatch => {
        fetch('/data/seeds')
            .then(res => res.json())
            .then(data => dispatch(setSeeds(data.items)));
    }
}
