function getExternalProductUrl(product) {
  try {
    if (!product) return null;
    if (product.externalUrl && typeof product.externalUrl === 'string') return product.externalUrl;
    if (product.flags && product.flags.externalUrl && typeof product.flags.externalUrl === 'string') return product.flags.externalUrl;
    return null;
  } catch (error) {
    console.error('getExternalProductUrl error:', error);
    return null;
  }
}

function openProductOrExternal(product, fallbackHref) {
  try {
    const url = getExternalProductUrl(product);
    if (url) {
      window.location.href = url;
      return;
    }
    if (fallbackHref) window.location.href = fallbackHref;
  } catch (error) {
    console.error('openProductOrExternal error:', error);
  }
}