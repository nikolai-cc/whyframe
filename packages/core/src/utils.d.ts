export interface Rpc {
  send: (name: string, payload: any) => void
  on: (name: string, callback: (payload: any) => void) => void
  teardown: () => void
}

export function createIframeRpc(iframe?: HTMLIFrameElement): Rpc
export function getWhyframeRawSource(
  iframe: HTMLIFrameElement
): string | undefined
export function reloadWhyframe(iframe: HTMLIFrameElement): void
