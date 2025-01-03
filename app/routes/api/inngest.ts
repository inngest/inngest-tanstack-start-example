import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';

import { inngest, functions } from 'app/inngest';

// temp
import { ServeHandlerOptions, InngestCommHandler } from 'inngest';

const serve = (options: ServeHandlerOptions) => {
  const handler = new InngestCommHandler({
    frameworkName: 'tanstack-start',
    fetch: fetch.bind(globalThis),
    ...options,
    handler: (req: Request) => {
      return {
        body: () => req.json(),
        headers: (key) => req.headers.get(key),
        method: () => req.method,
        url: () => new URL(req.url, `https://${req.headers.get('host') || ''}`),
        transformResponse: ({ body, status, headers }) => {
          return new Response(body, { status, headers });
        },
      };
    },
  });

  const requestHandler = handler.createHandler();
  return {
    GET: ({ request }: { request: Request }) => {
      return requestHandler(request);
    },
    POST: ({ request }: { request: Request }) => {
      return requestHandler(request);
    },
    PUT: ({ request }: { request: Request }) => {
      return requestHandler(request);
    },
  };
};

// export const APIRoute = createAPIFileRoute('/api/inngest')({
//   GET: ({ request, params }) => {
//     return json({ message: 'Hello "/api/inngest"!' });
//   },
// });

// const handler = serve({
//   client: inngest,
//   functions,
//   // servePath: '/api/inngest',
//   // streaming: 'force',
// });

export const APIRoute = createAPIFileRoute('/api/inngest')(
  serve({
    client: inngest,
    functions,
    // servePath: '/api/inngest',
    // streaming: 'force',
  }),
);

// export const APIRoute = createAPIFileRoute('/api/inngest')({
//   GET: ({ request }) => {
//     return handler(request);
//   },

//   POST: ({ request }) => {
//     return handler(request);
//   },

//   PUT: ({ request }) => {
//     return handler(request);
//   },
// });
