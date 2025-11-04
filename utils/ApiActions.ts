import { APIRequestContext, APIResponse, test } from '@playwright/test';
import { step, attachment, ContentType } from 'allure-js-commons';
import fs from 'fs';

export class ApiActions {
  private logs: ApiRequestLog[] = [];

  constructor(private request: APIRequestContext) { }

  async get(url: string, options?: Parameters<APIRequestContext['get']>[1]) {
    return this.logRequest('GET', url, async () => this.request.get(url, options), options);
  }

  async post(url: string, options?: Parameters<APIRequestContext['post']>[1]) {
    return this.logRequest('POST', url, async () => this.request.post(url, options), options);
  }

  async put(url: string, options?: Parameters<APIRequestContext['put']>[1]) {
    return this.logRequest('PUT', url, async () => this.request.put(url, options), options);
  }

  async patch(url: string, options?: Parameters<APIRequestContext['patch']>[1]) {
    return this.logRequest('PATCH', url, async () => this.request.patch(url, options), options);
  }

  async delete(url: string, options?: Parameters<APIRequestContext['delete']>[1]) {
    return this.logRequest('DELETE', url, async () => this.request.delete(url, options), options);
  }

  private async logRequest(
    method: string,
    url: string,
    executor: () => Promise<APIResponse>,
    options?: any
  ) {
    return step(`${method} ${url}`, async () => {
      const start = Date.now();
      const requestHeaders = options?.headers || {};
      const requestBody =
        options?.data || options?.form || options?.multipart || options?.body || null;

      let response: APIResponse;
      let responseBody: any = null;
      let status: number | undefined = undefined;
      let responseHeaders: Record<string, string> = {};

      try {
        response = await executor();
        status = response.status();
        responseHeaders = response.headers();

        try {
          responseBody = await response.json();
        } catch {
          responseBody = await response.text();
        }
      } catch (err) {
        responseBody = { error: String(err) };
        throw err;
      } finally {
        const durationMs = Date.now() - start;
        const log: ApiRequestLog = {
          timestamp: new Date(),
          method,
          url,
          requestHeaders,
          requestBody,
          status,
          responseHeaders,
          responseBody,
          durationMs,
        };

        this.logs.push(log);
        const consoleLog = test.info().project.metadata?.apiConsoleLogs ?? false;
        if (consoleLog) {
          this.consoleLog(log);
        }

        // Attach request info
        await attachment(
          'Request details',
          JSON.stringify(
            {
              method,
              url,
              headers: requestHeaders,
              body: requestBody,
            },
            null,
            2
          ),
          ContentType.JSON
        );

        // Attach response info
        await attachment('Response details',
          JSON.stringify(
            {
              status,
              durationMs,
              headers: responseHeaders,
              // body: responseBody,
            }, null, 2
          ),
          ContentType.JSON
        );
        await attachment('Response body',
          JSON.stringify(responseBody, null, 2),
          ContentType.JSON
        );
      }
      return response!;
    });
  }

  getLogs() {
    return this.logs;
  }

  saveToFile(path = 'api-logs.json') {
    fs.writeFileSync(path, JSON.stringify(this.logs, null, 2), 'utf-8');
  }

  private consoleLog(log: ApiRequestLog) {
    console.log(`\n[${log.method}] ${log.url}`);
    console.log('→ Headers:', log.requestHeaders);
    if (log.requestBody) console.log('→ Body:', log.requestBody);
    console.log(`← Status: ${log.status}`);
    console.log('← Response headers:', log.responseHeaders);
    console.log('← Response body:', JSON.stringify(log.responseBody).slice(0, 500));
    console.log(`Duration: ${log.durationMs}ms`);
  }
}

interface ApiRequestLog {
  timestamp: Date;
  method: string;
  url: string;
  requestHeaders: Record<string, string>;
  requestBody?: any;
  status?: number;
  responseHeaders: Record<string, string>;
  responseBody?: any;
  durationMs: number;
}
