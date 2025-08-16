from django.db import models


class Banco(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    codigo = models.CharField(max_length=10, unique=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} ({self.codigo})"
    
    class Meta:
        verbose_name = "Banco"
        verbose_name_plural = "Bancos"
        ordering = ['nome']
