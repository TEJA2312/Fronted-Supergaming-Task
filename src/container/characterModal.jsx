import { useForm } from "react-hook-form";
import InputComponent from "../components/input.jsx"
import TextAreaComponent from "../components/textArea.jsx"
import LevelStars from "../components/levelStars"
import ButtonType from "../components/buttonType";
import { useState } from "react";
import { Pencil } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";


const CharacterModal = ({ activeCharacter }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [edit, setEdit] = useState(false);
    const user = useSelector(state => state.user.user);

  const updateCharacterCall = async (data) => {

    let logs = [];

   if (data.characterName !== activeCharacter?.name) logs.push({ field: 'name', from: activeCharacter?.name, to: data.characterName });
   if (data.characterDescription !== activeCharacter?.description) logs.push({ field: 'description', from: activeCharacter?.description, to: data.characterDescription});
   if (data.characterRarity !== activeCharacter?.rarity) logs.push({ field: 'rarity', from: activeCharacter.rarity, to: data.characterRarity });
   if (data.characterUrl !== activeCharacter?.url) logs.push({ field: 'url', from: activeCharacter?.url, to: data.characterUrl });
   if (parseInt(data.characterLevel) !== activeCharacter?.level) logs.push({ field: 'level', from: activeCharacter?.level, to: parseInt(data.characterLevel) })

    try {
      await axios.post('http://localhost:8080/api/v1/character/updateCharacterById', {
        id: activeCharacter?._id,
        name: data.characterName,
        description: data.characterDescription,
        rarity: data.characterRarity,
        url: data.characterUrl,
        level: data.characterLevel,
        logs: logs
      },{
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });

      window.location.reload();

    } catch (error) {
      console.error('Error in loginCall function', error);
    }
  };

  return (<>
    {!edit ? 
        <div className='flex items-start'>
            <div className='w-1/3'>
             <div className="w-full h-[50vh]  rounded-xl group-hover:scale-[1.02] border-white cursor-pointer relative"
               style={{
                backgroundImage: `url(${activeCharacter?.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
               }}
              ></div>
            </div>
            <div className='w-2/3 py-4 px-8'>
              <div className="flex items-center gap-4">
                <p className='text-3xl font-medium text-white'>
                  {activeCharacter?.name} 
                </p>
               {user?.role != 'reader' && <Pencil onClick={()=> setEdit(true)} className="w-5 h-auto text-white ml-auto hover:scale-[1.02] cursor-pointer"/>  }
              </div>

              <p className='text-blue-400 font-medium text-base mt-4'>Description :-</p> 
              <p className='text-sm font-normal text-white mt-2'>
                {activeCharacter?.description}
              </p>
              <p className='text-blue-400 font-medium text-base mt-4'>Rarity :- </p>
              <p className='text-sm font-normal mt-2 text-white'>
                  {activeCharacter?.rarity}
              </p>
              <p className='text-blue-400 font-medium text-base mt-4'>Sort Order :- </p> 
              <p className='text-sm font-normal mt-2 text-white'>
                 {activeCharacter?.sortOrder}
              </p>
              
              <p className='text-blue-400 font-medium text-base mt-4'>Description :-</p> 
              <p className='text-sm font-normal mt-2 text-white'>
               <LevelStars rating={activeCharacter?.level} />
              </p>
            </div>
        </div>
    :
        <form onSubmit={handleSubmit(updateCharacterCall)} className="w-full p-4 flex flex-col gap-6">
         <article>
            <InputComponent
              label="Character Name"
              type="text"
              defaultValue={activeCharacter?.name}
              placeholder="enter new character name"
              {...register('characterName', {
                required: 'Name of the Character is required',
                minLength: {
                 value: 2,
                 message: 'Name must be of atleast 2 characters',
                },
              })}
              className={errors.characterName ? 'border-red-500' : ''}
            />
            {errors.characterName && (
              <p className="text-red-500 text-sm mt-1">{errors.characterName.message}</p>
            )}
          </article>
          <article>
            <TextAreaComponent
              label="Character Description"
              type="text"
              defaultValue={activeCharacter?.description}
              placeholder="enter new character description"
              {...register('characterDescription', {
                required: 'Character Description is required',
                minLength: {
                 value: 10,
                 message: 'Description must be of atleast 10 characters',
                },
              })}
              className={errors.characterDescription ? 'border-red-500' : ''}
            />
            {errors.characterDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.characterDescription.message}</p>
            )}
          </article>  
          <article>
            <InputComponent
              label="Image Url of Character"
              type="text"
              defaultValue={activeCharacter?.url}
              placeholder="enter a url for display image of the character"
              {...register('characterUrl', {
                required: 'URL is required',
                pattern: {
                  value: /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                  message: 'Enter a valid Image URL',
                },
              })}
              className={errors.characterUrl ? 'border-red-500' : ''}
            />
            {errors.characterUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.characterUrl.message}</p>
            )}
          </article>
          <article>
           <InputComponent
              label="Rarity"
              type="text"
              defaultValue={activeCharacter?.rarity}
              placeholder="enter the rarity of character"
              {...register('characterRarity', {
                required: 'Rarity is required',
                validate: (value) => ['Common', 'Epic', 'Rare'].includes(value) || 'The values must be Common, Rare or Epic (exact match)',
              })}
              className={errors.characterRarity ? 'border-red-500' : ''}
            />
            {errors.characterRarity && (
              <p className="text-red-500 text-sm mt-1">{errors.characterRarity.message}</p>
            )}
          </article>
          <article>
           <InputComponent
              label="Level"
              type="number" 
              defaultValue={activeCharacter?.level}
              placeholder="enter the level of character"
              {...register('characterLevel', {
                required: 'Level is required',
                validate: (value) => ["1", "2", "3", "4", "5"].includes(value) || 'Values from 1 to 5 are only allowed',
              })}
              className={errors.characterLevel ? 'border-red-500' : ''}
            />
            {errors.characterLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.characterLevel.message}</p>
            )}
          </article>
          <div className="flex items-center gap-4">
            <ButtonType type={'submit'} label={'Proceed'} />
            <button onClick={()=> setEdit(false)}
            className="text-sm p-2 rounded-md w-fit hover:scale-[1.02] cursor-pointer text-white font-medium border-2 border-white">cancel edit</button>
          </div>

        </form>
      }
  </>)

}

export default CharacterModal