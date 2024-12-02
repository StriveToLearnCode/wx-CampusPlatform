// global.d.ts
type AnyObject<T = any> = Record<string, T>;

// global.d.ts end
interface CancelAction {
    /**
     * 取消信息
     */
    (message?: string): void;
}
interface CancelExecutor {
    (cancel: CancelAction): void;
}
interface CancelTokenSource {
    /**
     * 取消令牌
     */
    token: CancelToken;
    /**
     * 取消函数
     */
    cancel: CancelAction;
}
interface CancelTokenConstructor {
    new (executor: CancelExecutor): CancelToken;
    source(): CancelTokenSource;
}
declare class Cancel {
    message?: string;
    constructor(message?: string);
    toString(): string;
}
declare function isCancel(value: unknown): value is Cancel;
declare class CancelToken {
    constructor(executor: CancelExecutor);
    static source(): CancelTokenSource;
}

interface AxiosTransformCallback<TData = unknown> {
    (
    /**
     * 数据
     */
    data?: TData, 
    /**
     * 头信息
     */
    headers?: AnyObject): TData | undefined;
}
type AxiosTransformer<TData = unknown> = AxiosTransformCallback<TData> | AxiosTransformCallback<TData>[];

interface InterceptorResolved<T = unknown> {
    (value: T): T | Promise<T>;
}
interface InterceptorRejected<T = unknown> {
    (error: unknown): T | Promise<T>;
}
/**
 * 拦截器管理器
 */
declare class InterceptorManager<T = unknown> {
    /**
     * 添加拦截器
     *
     * @param resolved 成功的回调
     * @param rejected 失败的回调
     * @returns 拦截器标识符（可用于移除拦截器）
     */
    use(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected<T>): number;
    /**
     * 移除拦截器
     *
     * @param id 拦截器标识符
     */
    eject(id: number): boolean;
    /**
     * 清空拦截器
     */
    clear(): void;
}

interface MiddlewareNext {
    (): Promise<void>;
}
/**
 * 中间件上下文
 */
interface MiddlewareContext {
    /**
     * 请求体
     *
     * 同于请求配置
     */
    req: AxiosRequestConfig;
    /**
     * 响应体
     */
    res: null | AxiosResponse;
}
/**
 * 中间件
 */
interface MiddlewareCallback {
    (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void>;
}

/**
 * 请求方法
 */
type AxiosRequestMethod = AxiosAdapterRequestMethod | 'options' | 'get' | 'head' | 'post' | 'put' | 'patch' | 'delete' | 'trace' | 'connect';
/**
 * 请求头
 */
interface AxiosRequestHeaders extends AnyObject {
    /**
     * 通用请求头
     */
    common?: AnyObject;
    /**
     * options 请求头
     */
    options?: AnyObject;
    /**
     * get 请求头
     */
    get?: AnyObject;
    /**
     * head 请求头
     */
    head?: AnyObject;
    /**
     * post 请求头
     */
    post?: AnyObject;
    /**
     * put 请求头
     */
    put?: AnyObject;
    /**
     * delete 请求头
     */
    delete?: AnyObject;
    /**
     * trace 请求头
     */
    trace?: AnyObject;
    /**
     * connect 请求头
     */
    connect?: AnyObject;
}
/**
 * 表单数据（上传会用到）
 */
interface AxiosRequestFormData extends AnyObject {
    /**
     * 文件名
     */
    name: string;
    /**
     * 文件路径
     */
    filePath: string;
}
/**
 * 请求数据
 */
type AxiosRequestData = string | AnyObject | ArrayBuffer | AxiosRequestFormData;
/**
 * 响应数据
 */
type AxiosResponseData = number | AxiosAdapterResponseData;
/**
 * 进度对象
 */
interface AxiosProgressEvent extends AnyObject {
    /**
     * 上传进度百分比
     */
    progress: number;
}
/**
 * 下载进度对象
 */
interface AxiosDownloadProgressEvent extends AxiosProgressEvent {
    /**
     * 已经下载的数据长度，单位 Bytes
     */
    totalBytesWritten: number;
    /**
     * 预预期需要下载的数据总长度，单位 Bytes
     */
    totalBytesExpectedToWrite: number;
}
/**
 * 监听下载进度
 */
interface AxiosDownloadProgressCallback {
    (event: AxiosDownloadProgressEvent): void;
}
/**
 * 上传进度对象
 */
interface AxiosUploadProgressEvent extends AxiosProgressEvent {
    /**
     * 已经上传的数据长度，单位 Bytes
     */
    totalBytesSent: number;
    /**
     * 预期需要上传的数据总长度，单位 Bytes
     */
    totalBytesExpectedToSend: number;
}
/**
 * 监听上传进度
 */
interface AxiosUploadProgressCallback {
    (event: AxiosUploadProgressEvent): void;
}
/**
 * 请求配置
 */
interface AxiosRequestConfig extends Partial<Omit<AxiosAdapterRequestConfig, 'type' | 'success' | 'fail'>> {
    /**
     * 请求适配器
     */
    adapter?: AxiosAdapter;
    /**
     * 基础路径
     */
    baseURL?: string;
    /**
     * 请求的 URL
     */
    url?: string;
    /**
     * 请求参数
     */
    params?: AnyObject;
    /**
     * 请求数据
     */
    data?: AxiosRequestData;
    /**
     * 请求头
     */
    headers?: AxiosRequestHeaders;
    /**
     * 请求方法
     */
    method?: AxiosRequestMethod;
    /**
     * 取消令牌
     */
    cancelToken?: CancelToken;
    /**
     * 下载文件
     */
    download?: boolean;
    /**
     * 上传文件
     */
    upload?: boolean;
    /**
     * 请求参数系列化函数
     */
    paramsSerializer?: (params?: AnyObject) => string;
    /**
     * 校验状态码
     */
    validateStatus?: (status: number) => boolean;
    /**
     * 转换请求数据
     */
    transformRequest?: AxiosTransformer<AxiosRequestData>;
    /**
     * 转换响应数据
     */
    transformResponse?: AxiosTransformer<AxiosResponseData>;
    /**
     * 错误处理
     */
    errorHandler?: (error: unknown) => Promise<AxiosResponse>;
    /**
     * 监听下载进度
     */
    onDownloadProgress?: AxiosUploadProgressCallback;
    /**
     * 监听上传进度
     */
    onUploadProgress?: AxiosUploadProgressCallback;
}
/**
 * 响应体
 */
interface AxiosResponse<TData extends AxiosResponseData = AxiosResponseData> extends AnyObject {
    /**
     * 状态码
     */
    status: number;
    /**
     * 状态字符
     */
    statusText: string;
    /**
     * 响应头
     */
    headers: AnyObject;
    /**
     * 响应数据
     */
    data: TData;
    /**
     * 请求配置
     */
    config: AxiosRequestConfig;
    /**
     * 请求任务
     */
    request?: AxiosAdapterPlatformTask;
}
/**
 * 错误体
 */
interface AxiosResponseError extends AnyObject {
    /**
     * 状态码
     */
    status: number;
    /**
     * 状态字符
     */
    statusText: string;
    /**
     * 响应头
     */
    headers: AnyObject;
    /**
     * 错误数据
     */
    data: AnyObject;
    /**
     * 失败的请求，指没能够成功响应的请求
     */
    isFail: true;
    /**
     * 请求配置
     */
    config: AxiosRequestConfig;
    /**
     * 请求任务
     */
    request?: AxiosAdapterPlatformTask;
}
interface AxiosRequest {
    <TData extends AxiosResponseData>(config: AxiosRequestConfig): Promise<AxiosResponse<TData>>;
    <TData extends AxiosResponseData>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TData>>;
}
/**
 * 普通的请求方法
 */
type AxiosRequestMethodFn = <TData extends AxiosResponseData>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<TData>>;
/**
 * 带参数的请求方法
 */
type AxiosRequestMethodFnWithParams = <TData extends AxiosResponseData>(url: string, params?: AnyObject, config?: AxiosRequestConfig) => Promise<AxiosResponse<TData>>;
/**
 * 带数据的请求方法
 */
type AxiosRequestMethodFnWithData = <TData extends AxiosResponseData>(url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => Promise<AxiosResponse<TData>>;
/**
 * Axios 构造函数
 */
interface AxiosConstructor {
    new (config: AxiosRequestConfig): Axios;
}
declare class Axios {
    /**
     * 默认请求配置
     */
    defaults: AxiosRequestConfig;
    /**
     * 拦截器
     */
    interceptors: {
        /**
         * 请求拦截器
         */
        request: InterceptorManager<AxiosRequestConfig>;
        /**
         * 响应拦截器
         */
        response: InterceptorManager<AxiosResponse<AxiosResponseData>>;
    };
    /**
     * 发送 options 请求
     */
    options: AxiosRequestMethodFn;
    /**
     * 发送 get 请求
     */
    get: AxiosRequestMethodFnWithParams;
    /**
     * 发送 head 请求
     */
    head: AxiosRequestMethodFnWithParams;
    /**
     * 发送 post 请求
     */
    post: AxiosRequestMethodFnWithData;
    /**
     * 发送 put 请求
     */
    put: AxiosRequestMethodFnWithData;
    /**
     * 发送 patch 请求
     */
    patch: AxiosRequestMethodFnWithData;
    /**
     * 发送 delete 请求
     */
    delete: AxiosRequestMethodFnWithParams;
    /**
     * 发送 trace 请求
     */
    trace: AxiosRequestMethodFn;
    /**
     * 发送 connect 请求
     */
    connect: AxiosRequestMethodFn;
    /**
     * @param config 默认配置
     * @param parent 父级实例
     */
    constructor(config: AxiosRequestConfig, parent?: Axios);
    /**
     * 发送请求
     */
    request: AxiosRequest;
    /**
     * 注册中间件
     *
     * 示例1：注册一个中间件
     * ```ts
     * axios.use(async function middleware(ctx, next) {
     *   console.log(ctx.req);
     *   await next();
     *   console.log(ctx.res);
     * });
     * ```
     *
     * 示例2：链式注册多个中间件
     * ```ts
     * axios
     *  .use(async function middleware1(ctx, next) {
     *    console.log(ctx.req);
     *    await next();
     *    console.log(ctx.res);
     *  })
     *  .use(async function middleware2(ctx, next) {
     *    console.log(ctx.req);
     *    await next();
     *    console.log(ctx.res);
     *  });
     * ```
     */
    use: (middleware: MiddlewareCallback) => this;
}

/**
 * 适配器请求方法
 */
type AxiosAdapterRequestMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'TRACE' | 'CONNECT';
/**
 * 适配器请求数据
 */
type AxiosAdapterRequestData = string | AnyObject | ArrayBuffer;
/**
 * 适配器响应数据
 */
type AxiosAdapterResponseData = string | ArrayBuffer | AnyObject;
/**
 * 适配器响应体
 */
interface AxiosAdapterResponse extends AnyObject {
    /**
     * 状态码
     */
    status?: number;
    /**
     * 响应头
     */
    headers?: AnyObject;
    /**
     * 响应数据
     */
    data: AxiosAdapterResponseData;
}
/**
 * 适配器错误体
 */
interface AxiosAdapterResponseError extends AnyObject {
    /**
     * 状态码
     */
    status?: number;
    /**
     * 响应头
     */
    headers?: AnyObject;
    /**
     * 错误数据
     */
    data?: AnyObject;
}
/**
 * 适配器请求配置
 */
interface AxiosAdapterRequestConfig extends AnyObject {
    /**
     * 请求类型
     */
    type: 'request' | 'upload' | 'download';
    /**
     * 开发者服务器接口地址
     */
    url: string;
    /**
     * HTTP 请求方法
     */
    method: AxiosAdapterRequestMethod;
    /**
     * 请求参数
     */
    params?: AnyObject;
    /**
     * 请求数据
     */
    data?: AxiosAdapterRequestData;
    /**
     * 请求头
     */
    headers?: AnyObject;
    /**
     * 返回的数据格式
     */
    dataType?: string;
    /**
     * 响应的数据类型
     */
    responseType?: string;
    /**
     * 超时时间，单位为毫秒。默认值为 60000
     */
    timeout?: number;
    /**
     * 成功的回调
     */
    success(response: AxiosAdapterResponse): void;
    /**
     * 失败的回调
     */
    fail(error: AxiosAdapterResponseError): void;
}
/**
 * 请求函数基本选项
 */
interface AxiosAdapterBaseOptions extends AxiosAdapterRequestConfig {
    /**
     * 请求头，同 headers
     */
    header?: AxiosRequestHeaders;
    /**
     * 成功的回调
     */
    success(response: AnyObject): void;
    /**
     * 失败的回调
     */
    fail(error: AnyObject): void;
}
/**
 * 请求函数选项
 */
type AxiosAdapterRequestOptions = AxiosAdapterBaseOptions;
/**
 * 下载函数选项
 */
interface AxiosAdapterDownloadOptions extends AxiosAdapterBaseOptions {
    /**
     * 文件下载后存储的路径
     */
    filePath?: string;
}
/**
 * 上传函数选项
 */
interface AxiosAdapterUploadOptions extends AxiosAdapterBaseOptions, AxiosRequestFormData {
    /**
     * [钉钉用 fileName 代替 name](https://open.dingtalk.com/document/orgapp/dd-upload-objects#title-ngk-rr1-eow)
     */
    fileName: string;
    /**
     * 钉钉 | 支付宝 特有参数
     */
    fileType?: 'image' | 'video' | 'audie';
    /**
     * 额外的数据
     */
    formData?: AnyObject;
}
/**
 * 请求函数
 */
interface AxiosAdapterRequest {
    (config: AxiosAdapterRequestOptions): AxiosAdapterPlatformTask;
}
/**
 * 下载函数
 */
interface AxiosAdapterDownload {
    (config: AxiosAdapterDownloadOptions): AxiosAdapterPlatformTask;
}
/**
 * 上传函数
 */
interface AxiosAdapterUpload {
    (config: AxiosAdapterUploadOptions): AxiosAdapterPlatformTask;
}
/**
 * 适配器平台
 */
interface AxiosAdapterPlatform {
    /**
     * 发送请求
     */
    request: AxiosAdapterRequest;
    /**
     * 下载文件
     */
    download: AxiosAdapterDownload;
    /**
     * 上传文件
     */
    upload: AxiosAdapterUpload;
}
/**
 * 适配器平台请求任务
 */
type AxiosAdapterPlatformTask = undefined | void | {
    abort?(): void;
    onProgressUpdate?(callback: (event: AxiosProgressEvent) => void): void;
    offProgressUpdate?(callback: (event: AxiosProgressEvent) => void): void;
};
/**
 * 适配器函数
 */
interface AxiosAdapter {
    (config: AxiosAdapterRequestConfig): AxiosAdapterPlatformTask;
}
/**
 * 创建适配器
 *
 * @param platform 平台 API 对象
 */
declare function createAdapter(platform: AxiosAdapterPlatform): (config: AxiosAdapterRequestConfig) => AxiosAdapterPlatformTask;

type AxiosErrorResponse = AxiosResponse | AxiosResponseError;
declare class AxiosError extends Error {
    config: AxiosRequestConfig;
    request: AxiosAdapterPlatformTask;
    response: AxiosErrorResponse;
    constructor(message: string, config: AxiosRequestConfig, response: AxiosErrorResponse, request: AxiosAdapterPlatformTask);
}
declare function isAxiosError(value: unknown): value is AxiosError;

/**
 * axios 实例默认配置
 */
interface AxiosInstanceDefaults extends AxiosRequestConfig {
    /**
     * 请求头
     */
    headers: Required<AxiosRequestHeaders>;
}
/**
 * axios 实例
 */
interface AxiosInstance extends AxiosRequest, Axios {
    /**
     * 默认请求配置
     */
    defaults: AxiosInstanceDefaults;
    /**
     * 获取 URI
     *
     * @param config 配置
     */
    getUri(config: AxiosRequestConfig): string;
    /**
     * 创建实例
     *
     * @param config 默认配置
     */
    create(config?: AxiosRequestConfig): AxiosInstance;
    /**
     * 扩展实例
     *
     * @param config 默认配置
     */
    extend(config: AxiosRequestConfig): AxiosInstance;
}

/**
 * axios 静态对象
 */
interface AxiosStatic extends AxiosInstance {
    /**
     * 版本号
     */
    version: string;
    /**
     * Axios 类
     */
    Axios: AxiosConstructor;
    /**
     * 取消令牌
     */
    CancelToken: CancelTokenConstructor;
    /**
     * 创建适配器
     */
    createAdapter: typeof createAdapter;
    /**
     * 传入取消请求错误返回 true
     */
    isCancel: typeof isCancel;
    /**
     * 传入响应错误返回 true
     */
    isAxiosError: typeof isAxiosError;
}
declare const axios: AxiosStatic;

declare const version = "2.7.2";

export { Axios, AxiosAdapter, AxiosAdapterDownload, AxiosAdapterDownloadOptions, AxiosAdapterPlatform, AxiosAdapterPlatformTask, AxiosAdapterRequest, AxiosAdapterRequestConfig, AxiosAdapterRequestMethod, AxiosAdapterRequestOptions, AxiosAdapterResponse, AxiosAdapterResponseData, AxiosAdapterResponseError, AxiosAdapterUpload, AxiosAdapterUploadOptions, AxiosDownloadProgressCallback, AxiosDownloadProgressEvent, AxiosInstance, AxiosInstanceDefaults, AxiosRequestConfig, AxiosRequestData, AxiosRequestFormData, AxiosRequestHeaders, AxiosRequestMethod, AxiosResponse, AxiosResponseData, AxiosResponseError, AxiosStatic, AxiosUploadProgressCallback, AxiosUploadProgressEvent, CancelToken, MiddlewareCallback, MiddlewareContext, MiddlewareNext, createAdapter, axios as default, isAxiosError, isCancel, version };
