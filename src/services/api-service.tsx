import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  FC,
} from "react";
import axios from "axios";

interface IDataSentence {
  text: string;
  id: string;
}
interface IApiService {
  fetchSentences: () => void;
  addSentence: (text: FormDataEntryValue) => Promise<void>;
  editSentence: (newText: FormDataEntryValue, id: string) => Promise<void>;
  deleteSentence: (id: string) => Promise<void>;
  sentences: IDataSentence[];
}

const host = "http://localhost:7000";
const prefix = "api";

export const routesApi = {
  sentences: () => [host, prefix, "sentences"].join("/"),
  addSentence: () => [host, prefix, "add_sentence"].join("/"),
  editSentence: () => [host, prefix, "edit_sentence"].join("/"),
  deleteSentence: () => [host, prefix, "delete_sentence"].join("/"),
};

const apiContext = createContext<IApiService>({} as IApiService);
const { Provider } = apiContext;

export const useApiService = () => useContext(apiContext);

const ApiService: FC = ({ children }) => {
  const [sentences, setSentence] = useState<IDataSentence[]>([]);

  useEffect(() => {
    fetchSentences();
  }, []);

  async function fetchSentences() {
    try {
      const response = await axios.get<IDataSentence[]>(routesApi.sentences());
      setSentence(response.data);
    } catch (error) {
      alert(error);
    }
  }

  async function addSentence(text: FormDataEntryValue) {
    try {
      const response = await axios.post<IDataSentence>(
        routesApi.addSentence(),
        {
          text,
        }
      );
      setSentence([...sentences, response.data]);
    } catch (error) {
      alert(error);
    }
  }

  async function editSentence(newText: FormDataEntryValue, id: string) {
    try {
      const { data } = await axios.post<IDataSentence>(
        routesApi.editSentence(),
        {
          newText,
          id,
        }
      );
      const index = sentences.findIndex((el) => el.id === data.id);
      let updatedSentences = sentences;
      updatedSentences[index].id = data.text;
      setSentence(updatedSentences);
    } catch (error) {
      alert(error);
    }
  }
  async function deleteSentence(id: string) {
    try {
      const { data } = await axios.delete<IDataSentence[]>(
        routesApi.deleteSentence(),
        {
          data: { id },
        }
      );
      setSentence(data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Provider
      value={{
        fetchSentences,
        addSentence,
        editSentence,
        deleteSentence,
        sentences,
      }}
    >
      {children}
    </Provider>
  );
};

export default ApiService;
