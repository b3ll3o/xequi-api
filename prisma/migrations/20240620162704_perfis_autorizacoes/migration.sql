-- CreateTable
CREATE TABLE "perfis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "autorizacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AutorizacaoToPerfil" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AutorizacaoToPerfil_A_fkey" FOREIGN KEY ("A") REFERENCES "autorizacoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AutorizacaoToPerfil_B_fkey" FOREIGN KEY ("B") REFERENCES "perfis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "perfis_nome_key" ON "perfis"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "autorizacoes_nome_key" ON "autorizacoes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_AutorizacaoToPerfil_AB_unique" ON "_AutorizacaoToPerfil"("A", "B");

-- CreateIndex
CREATE INDEX "_AutorizacaoToPerfil_B_index" ON "_AutorizacaoToPerfil"("B");
