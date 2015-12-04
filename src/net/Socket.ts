/**
 * Created by rodey on 14/11/12.
 */

///<reference path='socket-client.d.ts' />
//useless
class Socket {

    private state: number = 0;
    static CONNECTION: string = 'connection';
    static EMIT: string = 'emit';

    private host: string = '127.0.0.1';
    private port: number = 8080;
    private socket: Socket;
    private instance: Socket = null;

    public getInstance(): Socket{
        if(!this.instance){
            this.instance = new Socket();
        }
        return this.instance;
    }


    public connect(host?: string, port?: number): Socket{
        this.host = host;
        this.port = port;
        this.socket.connect(this.host + (port ? '/:' + port : ''));
        return this.socket;
    }

    public on(eventMsg: string, cb?: Function){
        this.socket.on(eventMsg, cb);
        return this.socket;
    }

    public emit(eventMsg: string, options?: any){
        this.socket.emit(eventMsg, options);
        return this.socket;
    }

}
