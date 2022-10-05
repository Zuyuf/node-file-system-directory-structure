import _path from 'path';


export function getPathObj(path: string) {
    const obj: IPath = {
        currentPathIdx: 0,
        path: path.split('/')
    };

    if (!obj.path.length) {
        throw new Error('Invalid Path');
    }

    if (obj.path.length === 2 && obj.path[1] === '') {
        obj.path.pop();
    }

    return obj;
}
