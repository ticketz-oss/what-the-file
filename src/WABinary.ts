export const getBinaryNodeChild = (node: any, tag: string) => {
  return node?.content?.find((child: any) => child.tag === tag)
}

export const getBinaryNodeChildBuffer = (node: any, tag: string) => {
  const child = getBinaryNodeChild(node, tag)
  return child ? Buffer.from(child.content) : undefined
}
