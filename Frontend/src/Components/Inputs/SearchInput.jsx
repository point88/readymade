import React, { useState, useEffect, useCallback } from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SearchIcon from '../../Assests/Images/search.png'
import i18n from '../../i18n'
import { debounce } from 'lodash'
import AuthService from '../../Services/auth'

const SearchInput = () => {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ users: [], projects: [] })

  const debouncedFetchData = useCallback(
    debounce((searchQuery) => {
      AuthService.fetchData(searchQuery)
        .then((data) => {
          // Move sorting and filtering here
          const users = data.users || []
          const projects = data.projects || []

          let sortedUsers = []
          let sortedProjects = []

          if (users.length) {
            sortedUsers = users.slice(0, 6).sort((a, b) => b.rating - a.rating)
          }

          if (projects.length) {
            sortedProjects = projects.slice(0, 6)
          }

          setResults({ users: sortedUsers, projects: sortedProjects })
        })
        .catch((error) => console.error('Error fetching data:', error))
    }, 1000),
    [],
  )

  useEffect(() => {
    if (query.trim()) {
      debouncedFetchData(query)
    } else {
      setResults({ users: [], projects: [] })
    }
  }, [query, debouncedFetchData])

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className="w-full">
      <div className="w-[90%] m-auto mb:m-0 h-[30px] mb:w-[324px] mb:h-[37px] xl:w-[648px] xl:h-[77px] rounded-[4px] sm:rounded-[8px] border-solid sm:border-[1px] border-[0.25px]  border-[#333333] bg-[#f4f5f2] flex justify-between items-center">
        <input
          type="text"
          placeholder={t('searchplaceholder')}
          className={
            'opacity-[0.25] h-full w-[70%] border-none bg-[#f4f5f2] focus:outline-none mx-[7px] sm:mx-[15px] xl:mx-[32px] text-[10px] mb:text-[10px] xl:text-[18px] ' +
            (lng ? 'text-left' : 'text-right')
          }
          value={query}
          onChange={handleInputChange}
        />
        <button className="gap-[10px] mx-[3.75px] xl:mx-[7.5px] normal-case bg-[#008c00] w-[50px] h-[24px] text-[8px] sm:w-[65px] sm:h-[30px] sm:text-[8px] xl:w-[130px] xl:h-[60px] xl:text-[18px] text-white rounded-[5px] flex items-center justify-center">
          <h1>{t('search')}</h1>
          <Box
            component={'img'}
            src={SearchIcon}
            className="xl:w-[25px] xl:h-[25px] md:w-[12px] md:h-[12px] w-[9px] h-[9px] m-0!"
          />
        </button>
      </div>
      {/* Display search results */}
      {query.trim() && (
        <div
          className="w-full mt-4 rounded-lg"
          style={{
            backgroundColor: 'white',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Top Rated Freelancers */}
          {results.users.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Top Rated Freelancers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.users.map((user, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded p-2 md:p-2 shadow"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-10 h-10 rounded-full mr-4"
                        viewBox="0 0 100 100"
                        fill="#c1c1c1"
                      >
                        <circle cx="50" cy="50" r="50" />
                      </svg>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-gray-500">{user.username}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p>Skills: {user.skill_names.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {results.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mt-4 mb-4">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded p-2 md:p-2 shadow"
                  >
                    <h2 className="text-lg font-semibold">{project.id}</h2>
                    <p className="text-gray-500">{project.title}</p>
                    <div className="mt-2">
                      <p className="font-semibold">
                        Description: {project.description}
                      </p>
                      <p>
                        Skills Required:{' '}
                        {project.skill_names
                          .map((skill) => skill.skill_name)
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      ;
    </div>
  )
}
export default SearchInput
