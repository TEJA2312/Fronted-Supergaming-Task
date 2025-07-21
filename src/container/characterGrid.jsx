import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css';
import LevelStars from '../components/levelStars';
import Modal from '../components/modal.jsx';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import CharacterModal from './characterModal.jsx';

const CharacterGrid = ({ charactersData }) => {

if(!charactersData){
    return (
      <div className='flex items-center justify-center h-screen'>
       <Loader className='animate-spin w-8 h-8 text-white' />
      </div>
    )
}

const [isModalOpen, setIsModalOpen] = useState(false);
const [activeCharacter, setActiveCharacter] = useState(charactersData[0]);

const NUM_COLUMNS = 7;
const NUM_ROWS = Math.ceil(charactersData?.length / NUM_COLUMNS);
const COLUMN_WIDTH = 200
const ROW_HEIGHT = 320;

console

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {

    const index = rowIndex * NUM_COLUMNS + columnIndex;
    if (index >= charactersData.length) {
      return <div key={key} style={style} />; 
    }

    return (
      <div
        key={key}
        style={style}
        className=" group flex flex-col items-center justify-center text-sm bg-black"
      >
      <article onClick={() => {
        setActiveCharacter(charactersData[index])
        setIsModalOpen(true)
        }}>
        <div
          className={`w-[180px] rounded-t-xl group-hover:scale-[1.02] p-2 ${
            charactersData[index]?.rarity === 'Common'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-900'
              : charactersData[index]?.rarity === 'Rare'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
          }`}
        >
          <p className='text-white text-center font-medium text-sm'>
            {charactersData[index]?.name}
            <p className='text-xs'> ( {charactersData[index]?.rarity} )</p>
          </p>
        </div>

        <div
          className="w-[180px] h-[200px] group-hover:scale-[1.02] border-white cursor-pointer relative"
          style={{
            backgroundImage: `url(${charactersData[index]?.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
        >
      </div>
        <div className='w-[180px] flex items-center group-hover:scale-[1.02] rounded-b-xl bg-gradient-to-r from-slate-900 to-slate-700 p-2 '>
          <LevelStars rating={charactersData[index]?.level} />
          <p className='text-sm ml-auto text-white font-bold'>{charactersData[index]?.sortOrder}</p>
        </div>
</article>
      </div>
    );
  };

  return (
    <div className="w-fit mx-auto overflow-x-hidden p-4">
      <Grid
        columnCount={NUM_COLUMNS}
        columnWidth={COLUMN_WIDTH}
        height={window.innerHeight - 140} 
        rowCount={NUM_ROWS}
        rowHeight={ROW_HEIGHT}
        width={(COLUMN_WIDTH * NUM_COLUMNS) + 20}
        cellRenderer={cellRenderer}
      />
      <Modal activeCharacter={activeCharacter} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CharacterModal activeCharacter={activeCharacter} />
      </Modal>
    </div>
  );
};

export default CharacterGrid;
