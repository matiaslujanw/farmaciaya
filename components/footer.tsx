import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo.jpeg"
              alt="FarmaciaYA"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {'Encontrá productos y farmacias cerca tuyo en segundos.'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogo" className="text-muted-foreground hover:text-primary">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/farmacias" className="text-muted-foreground hover:text-primary">
                  Farmacias
                </Link>
              </li>
              <li>
                <Link href="/turnos" className="text-muted-foreground hover:text-primary">
                  Turnos
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Información</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Términos y Condiciones</li>
              <li className="text-muted-foreground">Política de Privacidad</li>
              <li className="text-muted-foreground">Preguntas Frecuentes</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: contacto@farmaciaya.com</li>
              <li>Tel: 0800-FARMACIA</li>
              <li>Lun a Vie 9:00-18:00hs</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FarmaciaYA. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">
            {'Los precios y disponibilidad son referenciales. Consultá con tu farmacia.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
