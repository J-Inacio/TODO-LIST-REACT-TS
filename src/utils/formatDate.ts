export const formatDate = (rawDate: Date | number | undefined | string) => {
  if (rawDate === undefined) {
    console.error("data em formato inválido ou ausente");
    return "Data indisponível";
  }

  return new Date(rawDate).toLocaleDateString("pt-BR");
};
