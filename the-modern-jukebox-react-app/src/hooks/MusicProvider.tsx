export default class MusicProvider {

    static sharedProvider() {
        if(!MusicProvider.instance) {
            MusicProvider.instance = new MusicProvider();
        }
        return MusicProvider.instance;
    }

    configure() {
        window.MusicKit.configure({
            developerToken: 'No Token Yet',
            app: {
                name: 'The Modern Jukebox',
                build: ''
            }
        });
    }

    getMusicInstance() {
        return window.MusicKit.getInstance();
    }
}