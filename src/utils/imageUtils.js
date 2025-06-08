/**
 * Utilitaires pour gérer les images sans Firebase Storage
 */

/**
 * Convertit un fichier en base64
 * @param {File} file - Le fichier à convertir
 * @returns {Promise<string>} - La chaîne base64
 */
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * Génère une URL d'image aléatoire depuis Picsum Photos
 * @param {number} width - Largeur souhaitée
 * @param {number} height - Hauteur souhaitée
 * @returns {string} - URL de l'image placeholder
 */
export const getPlaceholderImage = (width = 400, height = 300) => {
  const randomId = Math.floor(Math.random() * 1000)
  return `https://picsum.photos/id/${randomId}/${width}/${height}`
}

/**
 * Vérifie si un fichier est une image et respecte les limites de taille
 * @param {File} file - Le fichier à vérifier
 * @param {number} maxSizeKB - Taille maximale en KB
 * @returns {boolean} - true si le fichier est valide
 */
export const validateImageFile = (file, maxSizeKB = 1024) => {
  // Vérifier le type
  if (!file.type.match('image.*')) {
    alert('Veuillez sélectionner une image.')
    return false
  }

  // Vérifier la taille
  if (file.size > maxSizeKB * 1024) {
    alert(`L'image est trop volumineuse. La taille maximale est de ${maxSizeKB}KB.`)
    return false
  }

  return true
}
