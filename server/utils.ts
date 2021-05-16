/*
 * @Author: saber2pr
 * @Date: 2020-06-21 10:10:08
 * @Last Modified by: saber2pr
 * @Last Modified time: 2020-06-27 15:05:03
 */
import { networkInterfaces } from "os"

export function getLocalIP() {
  const interfaces = networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const interf of interfaces[name]) {
      const { address, family, internal } = interf
      if (family === "IPv4" && !internal) {
        return address
      }
    }
  }
}
