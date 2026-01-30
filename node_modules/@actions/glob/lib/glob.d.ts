import { Globber } from './internal-globber.js';
import { GlobOptions } from './internal-glob-options.js';
import { HashFileOptions } from './internal-hash-file-options.js';
export { Globber, GlobOptions };
/**
 * Constructs a globber
 *
 * @param patterns  Patterns separated by newlines
 * @param options   Glob options
 */
export declare function create(patterns: string, options?: GlobOptions): Promise<Globber>;
/**
 * Computes the sha256 hash of a glob
 *
 * @param patterns  Patterns separated by newlines
 * @param currentWorkspace  Workspace used when matching files
 * @param options   Glob options
 * @param verbose   Enables verbose logging
 */
export declare function hashFiles(patterns: string, currentWorkspace?: string, options?: HashFileOptions, verbose?: Boolean): Promise<string>;
