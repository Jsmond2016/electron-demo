const Store = require('electron-store')
const uuidv4 = require('uuid/v4')
const path = require('path')

class DataStore extends Store{
    constructor(settings) {
        super(settings)
        this.tracks = [] // 暂存音乐文件
    }

    saveTracks() {
        this.set('tracks', this.tracks)
        return this
    }

    getTracks() {
        return this.get('tracks') || []
    }

    addTracks(tracks) {
        const trackWithProps = tracks.map(track => {
            return {
                id: uuidv4(),
                path: track,
                filename: path.basename(track)
            }
        }).filter(track => { // 去重
            const currentTrackPath = this.getTracks().map(track => track.path)
            return currentTrackPath.indexOf(track.path) < 0
        })
        this.tracks = [ ...this.tracks, ...trackWithProps ]
        return this.saveTracks()

    }

    deleteTrack(deleteId) {
        this.tracks = this.tracks.filter(item => item.id !== deleteId)
        return this.saveTracks()
    }
}

module.exports = DataStore