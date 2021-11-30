import { useHistory, useLocation } from 'react-router-dom'

type QueryParam = {
    key: string
    value: string
}

type Response = {
    changeQueryParams: (pathname: string, queryParameters?: QueryParam[]) => void
    getQueryParams: () => URLSearchParams
}

function useQueryParams(): Response {
    const history = useHistory()
    const { search } = useLocation()

    function changeQueryParams(pathname: string, queryParameters: QueryParam[] = []) {
        const queryStrings = queryParameters
            .map((parameter) => {
                return `${parameter.key}=${parameter.value}`
            })
            .join('&')

        history.push({
            pathname,
            search: `?${queryStrings}`,
        })
    }

    function getQueryParams() {
        return new URLSearchParams(search)
    }

    return { changeQueryParams, getQueryParams }
}

export default useQueryParams
export type { QueryParam }
