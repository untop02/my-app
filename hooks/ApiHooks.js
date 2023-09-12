import {useEffect, useState} from 'react';
import {apiUrl} from '../utils/app-config';
import {doFetch} from '../utils/functions';
const useMedia = (update) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + 'media');

      const mediaFiles = await Promise.all(
        json.map(async (item) => {
          const fileData = await doFetch(apiUrl + 'media/' + item.file_id);
          return fileData;
        }),
      );
      setMediaArray(mediaFiles);
    } catch (error) {
      console.error('loadMedia failed', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (mediaData, token) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: mediaData,
    };
    const uploadResult = await doFetch(apiUrl + 'media', options);
    setLoading(false);
    return uploadResult;
  };

  return {mediaArray, postMedia, loading};
};

const useAuthentication = () => {
  const postLogin = async (user) => {
    return await doFetch(apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };
  return {postLogin};
};

const registerUser = () => {
  const postUser = async (user) => {
    try {
      return await doFetch(apiUrl + 'users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.error('postLogin error' + error);
    }
  };
  const putUser = async (user, token) => {
    console.log('haloo');
    try {
      return await doFetch(apiUrl + 'users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.error('postLogin error' + error);
    }
  };
  const checkUsername = async (username) => {
    try {
      const response = await doFetch(`${apiUrl}users/username/${username}`);
      return response.available;
    } catch (error) {
      throw new Error('checkUsername error', error.message);
    }
  };
  return {postUser, checkUsername, putUser};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(apiUrl + 'users/user', options);
  };
  return {getUserByToken};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(apiUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag error', error.message);
    }
  };

  return {getFilesByTag};
};

export {useMedia, useAuthentication, useUser, registerUser, useTag};
