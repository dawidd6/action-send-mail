/**
 * Minimal HTTP/S proxy client
 */
import net from 'node:net';
import type { Callback } from '../errors.js';
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
export type HttpProxyClientCallback = Callback<net.Socket>;
/**
 * Establishes proxied connection to destinationPort
 *
 * httpProxyClient("http://localhost:3128/", 80, "google.com", function(err, socket){
 *     socket.write("GET / HTTP/1.0\r\n\r\n");
 * });
 *
 * @param proxyUrl proxy configuration, e.g. "http://proxy.host:3128/"
 * @param destinationPort Port to open in destination host
 * @param destinationHost Destination hostname
 * @param callback Callback to run with the socket object once connection is established
 */
declare function httpProxyClient(proxyUrl: string, destinationPort: number | string, destinationHost: string, callback: HttpProxyClientCallback): void;
/**
 * Establishes proxied connection to destinationPort through an HTTPS proxy
 *
 * @param proxyUrl proxy configuration, e.g. "https://proxy.host:3128/"
 * @param destinationPort Port to open in destination host
 * @param destinationHost Destination hostname
 * @param tlsOptions TLS options for the proxy connection (e.g. { rejectUnauthorized: false })
 * @param callback Callback to run with the socket object once connection is established
 */
declare function httpProxyClient(proxyUrl: string, destinationPort: number | string, destinationHost: string, tlsOptions: HttpProxyClientOptions | undefined, callback: HttpProxyClientCallback): void;
/**
 * Socket timeout in milliseconds while the CONNECT handshake is in progress, defaults to 30 seconds.
 * Settable on the function itself, the same way the CommonJS module exposed it.
 */
declare namespace httpProxyClient {
    let timeout: number | undefined;
}
export default httpProxyClient;
