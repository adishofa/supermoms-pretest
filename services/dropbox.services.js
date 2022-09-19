import { uploadAsync, FileSystemUploadType } from 'expo-file-system'
import { TOKEN_BEARER, API_DROPBOX, CONTENT_DROPBOX } from '@env'

export const uploadFile = async (dataCSV) => {
    const dropboxArg = {
        autorename: true,
        mode: 'overwrite',
        mute: true,
        path: '/csvsupermoms.csv',
        strict_conflict: false
    }

    try {
        const res = await uploadAsync(
            CONTENT_DROPBOX + '/files/upload',
            dataCSV,
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN_BEARER}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': JSON.stringify(dropboxArg)
                },
                httpMethod: 'POST',
                uploadType: FileSystemUploadType.BINARY_CONTENT
            }
        )
    
        return res
    } catch (err) {
        throw err
    }
}

export const shareFile = async () => {
    const data = {
        path: '/csvsupermoms.csv',
        settings: {
            access: 'viewed',
            allow_download: true,
            audience: 'public'
        }
    }

    const res = await fetch(
        API_DROPBOX + '/sharing/create_shared_link_with_settings', {
        method: 'POST',    
        headers: {
            'Authorization': `Bearer ${TOKEN_BEARER}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .catch(err => { throw err })

    return res
}

export const getLinkList = async () => {
    const data = {
        path: '/csvsupermoms.csv'
    }

    try {
        const res = await fetch(
            API_DROPBOX + '/sharing/list_shared_links', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN_BEARER}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .catch(err => { throw err })
    
        return res
    } catch (err) {
        throw err
    }
}
