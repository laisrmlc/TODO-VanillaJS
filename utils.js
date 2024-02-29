function renderIcon(node, paths, iconClass) {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  iconSvg.setAttribute('fill', 'currentColor')
  iconSvg.setAttribute('viewBox', '0 0 16 16')
  iconSvg.setAttribute('width', '16')
  iconSvg.setAttribute('height', '16')
  iconSvg.setAttribute('class', iconClass)

  paths.forEach(path => {
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )

    iconPath.setAttribute(
      'd',
      path
    )
    iconSvg.appendChild(iconPath)
  })

  return node.appendChild(iconSvg)
}