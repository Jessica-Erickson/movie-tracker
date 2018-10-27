import { key } from './key.js';

export const getMovieData = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
    const data = await response.json()
  
    return cleanMovieData(data)
  } catch (e) {
    return e
  }
}

const cleanMovieData = (data) => {
  return data.results.map( movie => ({ 
    title: movie.title,
    poster_path: movie.poster_path,
    overview: movie.overview,
    release_date: movie.release_date,
    favorited: false,
  }))
}

export const getUser = async (user) => {
  const url = 'http://localhost:3000/api/users';
  const { email, password } = user;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      password,
      email
      }),
    headers: {
      'Content-Type': 'application/json'
    },
  }

  const response = await fetch(url, options);
  if(response.ok) {
    const existingUser = await response.json();
    return existingUser.data.name;  
  } else if (response.status === 500) {
    throw new Error('status was not ok, 500 error')
  } else {
    throw new Error('status was not ok')  
  }
}

export const addUser = async (user) => {
  const url = 'http://localhost:3000/api/users/new';
  const { email , password , name } = user;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      password,
      email,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  }

  const response = await fetch(url, options);
}
