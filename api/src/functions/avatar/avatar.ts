import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import avataaars from '@dicebear/avatars-avataaars-sprites';
import avataaarsOptions from './avataaars';
import Avatars from '@dicebear/avatars';

const styles: Record<string, any> = {
  avataaars: [avataaars, avataaarsOptions],
};

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked avatar function')

    let headers = new Headers();

    let [style, options] = styles['avataaars']

    if (undefined === style) {
      return new Response('404 Not Found', {
        status: 404,
      });
    }

    let seed = decodeURIComponent(`${Math.random() * 100}` || '');
    let avatars = new Avatars(style);
    let svg = avatars.create(seed, options.cast());

    headers.append('Content-Type', 'image/svg+xml');
    headers.append('Cache-Control', `max-age=${60 * 60 * 24 * 365}`);

    return new Response(svg, {
      headers: headers,
    });
}
