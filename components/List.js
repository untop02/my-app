import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useEffect, useState} from 'react';



const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
        const [mediaArray, setmediaArray] = useState([])


const loadMedia = async () => {
    try{
        const response = await fetch(url);
        const json = await response.json();
        setmediaArray(json);
    }catch(error){
        console.log(error)
    }
   
};

useEffect(() => {
    loadMedia();
  }, []);

let ph = [];


return (
    <FlatList
        data={mediaArray}
        renderItem={({item}) => <ListItem singleMedia={item} />}
    />
);
};
export default List;