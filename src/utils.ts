/*
 * @Author: saber2pr
 * @Date: 2020-06-21 11:44:05
 * @Last Modified by: saber2pr
 * @Last Modified time: 2020-06-21 12:33:01
 */
export const rgb = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const rgb = "rgb(" + r + "," + g + "," + b + ")"
  return rgb
}

export const scrollToBottom = (ele: HTMLElement) =>
  ele.scrollTo({
    top: ele.scrollHeight,
    behavior: "smooth"
  })
