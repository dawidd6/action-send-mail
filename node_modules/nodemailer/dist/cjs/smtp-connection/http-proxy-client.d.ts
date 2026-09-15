/**
 * Minimal HTTP/S proxy client
 */
import net from 'node:net';
import type { NodemailerError } from '../errors.js';
/**
 * TLS options for connecting to an HTTPS proxy
 */
export interface HttpProxyClientOptions {
    /** Set to false to accept a proxy certificate that fails validation (e.g. self-signed) */
    rejectUnauthorized?: boolean | undefined;
}
/**
 * Receives the proxied socket once the CONNECT handshake has succeeded, or the error that prevented it
 */
export type HttpProxyClientCallback = (err: NodemailerError | null, socket?: net.Socket) => void;
/**
 * Establishes proxied connection to destinationPort
 *
 * httpProxyClient("http://localhost:3128/", 80, "google.com", function(err, socket){
 *     socket.write("GET / HTTP/1.0\r\n\r\n");
 * });
 *
 * @param proxyUrl proxy configuration, etg "http://proxy.host:3128/"
 * @param destinationPort Port to open in destination host
 * @param destinationHost Destination hostname
 * @param [tlsOptions] Optional TLS options for an HTTPS proxy (e.g. { rejectUnauthorized: false })
 * @param callback Callback to run with the rocket object once connection is established
 */
declare function httpProxyClient(proxyUrl: string, destinationPort: number | string, destinationHost: string, callback: HttpProxyClientCallback): void;
declare function httpProxyClient(proxyUrl: string, destinationPort: number | string, destinationHost: string, tlsOptions: HttpProxyClientOptions | undefined, callback: HttpProxyClientCallback): void;
/**
 * Socket timeout in milliseconds while the CONNECT handshake is in progress, defaults to 30 seconds.
 * Settable on the function itself, the same way the CommonJS module exposed it.
 */
declare namespace httpProxyClient {
    let timeout: number | undefined;
}
export default httpProxyClient;
