export const formatDate = (rawDate: string | undefined | null) => {
  if (rawDate === undefined) {
    console.error("data em formato inválido ou ausente");
    return "Data indisponível";
  }

  if (rawDate === null) {
    return "";
  }

  return new Date(rawDate).toLocaleDateString("pt-BR");
};
