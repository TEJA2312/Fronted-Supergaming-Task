import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Scroll, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import CharacterGrid from '../container/characterGrid';
import axiosInstance from '../config/axiosInstance.js';
import { clearUserCreds } from '../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';

function Home() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [charactersData, setCharactersData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerReload, setTriggerReload] = useState(null);

  useEffect(() => {
    if(user === null) {
      navigate('/login')
    }
  },[])

  useEffect(() => {
    const getAllCharacters = async () => {
      const response = await axiosInstance.get('api/v1/character/getAllCharacters', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      setCharactersData(response.data);
    };
    getAllCharacters();
  }, [triggerReload]);

  async function performSearch() {
    const response = await axiosInstance.get(`api/v1/character/searchCharacters?search=${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      }
    );
    setCharactersData(response.data);
  }

  return (
    <section className="min-h-screen w-full bg-black">
      <header className="w-full border-b border-white">
        <div className="flex items-center gap-4">
          <p className="text-white font-medium text-base p-3">SuperGaming Platform</p>
          <p className="text-white text-sm font-medium p-3 ml-auto">Welcome {user?.email}</p>
          
         {user?.role === 'admin' && <p
            onClick={() => {
              navigate('/audit');
            }}
            className="flex items-center gap-2 text-sm text-white border-l p-3 border-white hover:text-blue-500 cursor-pointer group"
          >
            <Scroll className="w-4 h-auto group-hover:text-blue-500 text-white" />
            Audit Logs
          </p>}
          <p
            onClick={() => {
              dispatch(clearUserCreds());
              navigate('/login');
            }}
            className="flex items-center gap-2 text-sm text-white border-l p-3 border-white hover:text-blue-500 cursor-pointer group"
          >
            <LogOut className="w-4 h-auto group-hover:text-blue-500 text-white" />
            Logout
          </p>
        </div>
      </header>
      <header className="w-full border-b border-white">
        <div className="flex items-center">
          <p className="flex items-center w-fit text-sm text-white p-3 border-white hover:text-blue-500 cursor-pointer text-nowrap group">
            <Search className="w-6 h-auto text-white group-hover:text-blue-500" />
          </p>
          <p className="flex w-[90%] items-center gap-2 text-sm text-white border-l p-3 border-white">
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    performSearch();
                  }
                }}
              value={searchQuery}
              placeholder="search character names and description here ..."
              className="text-base w-full font-medium text-white placeholder:text-gray-500 outline-none"
            />
            <button
              onClick={() => {
                 setTriggerReload(Date.now());
                 setSearchQuery('');
                 }}
              className="w-[10%] hover:scale-[1.02]"
            >
              clear search
            </button>
          </p>
          <p
            onClick={performSearch}
            className="flex items-center gap-2 text-sm text-white border-l ml-auto bg-gradient-to-r from-teal-400 to-blue-400 p-3 border-white cursor-pointer text-nowrap"
          >
            Apply search
          </p>
        </div>
      </header>
      <main className="w-full">
        <CharacterGrid charactersData={charactersData} />
      </main>
    </section>
  );
}

export default Home;
