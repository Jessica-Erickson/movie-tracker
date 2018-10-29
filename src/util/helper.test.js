import * as API from './helper.js';
import * as mock from './mocks.js';

describe('API', () => {
  describe('getMovieData', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.mockResults)
      }))
    })

    it('should call fetch with the correct params', async () => {

      await API.getMovieData()
      expect(window.fetch).toHaveBeenCalledWith(mock.url)
    });

    it('should return data in the correct format', async () => {
      const expected = await API.getMovieData()
      expect(await API.getMovieData()).toEqual(expected)
    });

    it('should throw an error if the status is not ok', async () => {
       window.fetch = jest.fn().mockImplementation(() => Promise.reject({
          ok: false
        }))
      const expected = { ok: false}


      expect(await API.getMovieData()).toEqual(expected)
    });
  });

  describe('cleanMovieData', () => {

    it('Should return data in the correct format', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.mockResults)
      }))

      const expected = [{
        title: 'Venom',
        poster_path: '2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg',
        overview: 'This movie is RAD!',
        release_date: '2018-9-11',
        favorited: false,
      }]
      const result = await API.getMovieData();

      expect(expected).toEqual(result);

    })
  });
  describe('getUser', () => {
    beforeEach(() => {
      window.fetch = jest.fn(() => (Promise.resolve({
              json: () => Promise.resolve(mock.userResponse),
              ok: true,
            }
          )
        )
      )
    })
    it('should check if the user exists', async () => {
      const url = 'http://localhost:3000/api/users'
      API.getUser(mock.user)

      expect(window.fetch).toHaveBeenCalledWith(url, mock.options)
    })
    it('should return is status is success', async () => {
      const result = await API.getUser(mock.user);
      const expected = { name: 'Jessica' , id: 2 };

      expect(result).toEqual(expected);
    })
    it('should give an error message if fetch fails', async () => {
      window.fetch = jest.fn(() => (Promise.resolve({
          ok: false,
          status: 500,
        })))
      const expected = Error('Email and Password do not match.')

      await expect(API.getUser(mock.user)).rejects.toEqual(expected)    
    })
  })
  describe('addUser', () => {
    beforeEach(() => {
      window.fetch = jest.fn(() => (
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mock.newUserResponse)
        })
      ))
    });

    it('should call fetch with the correct params', () => {
      const url = 'http://localhost:3000/api/users/new'
      
      API.addUser(mock.newUser)

      expect(window.fetch).toHaveBeenCalledWith(url, mock.newOptions)
    });

    it('should return status if user is added', async () => {
      const expected = { id: 4, name: 'Tim'};
      const result = await API.addUser(mock.newUser);

      expect(result).toEqual(expected);
    });
    
    it('should throw an error if the user already exists', async () => {
      window.fetch = jest.fn(() => (Promise.resolve({
        ok: false,
        status: 500,
      })));

      const expected = Error('Email has already been used.');

      await expect(API.addUser(mock.newUser)).rejects.toEqual(expected);
    });
  });
});
