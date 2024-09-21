import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Data(),
      child: const MyApp(),
    ),
  );
}

class Data extends ChangeNotifier {
  List<Map<String, dynamic>> _clientes = [];

  List<Map<String, dynamic>> get clientes => _clientes;

  void agregarCliente(String nombre, double cantidadPrestada, double cuotasMensuales) {
    _clientes.add({
      'nombre': nombre,
      'cantidadPrestada': cantidadPrestada,
      'cuotasMensuales': cuotasMensuales,
      'cuotasPagadas': 0,
    });
    notifyListeners();
  }

  void pagarCuota(String nombreCliente) {
    for (var cliente in _clientes) {
      if (cliente['nombre'] == nombreCliente && cliente['cuotasPagadas'] < cliente['cuotasMensuales']) {
        cliente['cuotasPagadas']++;
        notifyListeners();
        break;
      }
    }
  }
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  var selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget page;
    switch (selectedIndex) {
      case 0:
        page = const PageOne();
        break;
      case 1:
        page = const PageTwo();
        break;
      case 2:
        page = const PageThree();
        break;
      default:
        throw UnimplementedError('No widget for $selectedIndex');
    }

    return MaterialApp(
      home: Scaffold(
        body: Row(
          children: [
            SafeArea(
              child: NavigationRail(
                extended: false,
                destinations: const [
                  NavigationRailDestination(
                    icon: Icon(Icons.home),
                    label: Text('Page 1'),
                  ),
                  NavigationRailDestination(
                    icon: Icon(Icons.settings),
                    label: Text('Page 2'),
                  ),
                  NavigationRailDestination(
                    icon: Icon(Icons.person),
                    label: Text('Page 3'),
                  ),
                ],
                selectedIndex: selectedIndex,
                onDestinationSelected: (value) {
                  setState(() {
                    selectedIndex = value;
                  });
                },
              ),
            ),
            Expanded(
              child: Container(
                color: Theme.of(context).colorScheme.primaryContainer,
                child: page,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class PageOne extends StatefulWidget {
  const PageOne({super.key});

  @override
  _PageOneState createState() => _PageOneState();
}

class _PageOneState extends State<PageOne> {
  final _nombreController = TextEditingController();
  final _cantidadController = TextEditingController();
  final _cuotasController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var data = Provider.of<Data>(context);

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
                      // Título
            const Text(
              'Agregar Cliente',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          TextField(
            controller: _nombreController,
            decoration: const InputDecoration(
              labelText: 'Nombre del cliente',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _cantidadController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Cantidad de dinero prestado',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _cuotasController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Cuotas mensuales',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              var nombre = _nombreController.text;
              var cantidadPrestada = double.tryParse(_cantidadController.text) ?? 0.0;
              var cuotasMensuales = double.tryParse(_cuotasController.text) ?? 0.0;

              data.agregarCliente(nombre, cantidadPrestada, cuotasMensuales);
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _cantidadController.dispose();
    _cuotasController.dispose();
    super.dispose();
  }
}



class PageTwo extends StatefulWidget {
  const PageTwo({super.key});

  @override
  _PageTwoState createState() => _PageTwoState();
}

class _PageTwoState extends State<PageTwo> {
  String? _clienteSeleccionado;

  @override
  Widget build(BuildContext context) {
    var data = Provider.of<Data>(context);

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center, // Centra verticalmente
          crossAxisAlignment: CrossAxisAlignment.center, // Centra horizontalmente
          children: [
            // Título
            const Text(
              'Realizar pagos',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),

            // Dropdown para seleccionar cliente
            data.clientes.isNotEmpty
                ? DropdownButton<String>(
                    hint: const Text('Seleccione un cliente'),
                    value: _clienteSeleccionado,
                    onChanged: (String? nuevoValor) {
                      setState(() {
                        _clienteSeleccionado = nuevoValor;
                      });
                    },
                    items: data.clientes.map<DropdownMenuItem<String>>((cliente) {
                      return DropdownMenuItem<String>(
                        value: cliente['nombre'],
                        child: Text(cliente['nombre']),
                      );
                    }).toList(),
                  )
                : const Text('No hay clientes disponibles'),

            const SizedBox(height: 20),

            // Botón para pagar una cuota
            ElevatedButton(
              onPressed: _clienteSeleccionado != null
                  ? () {
                      // Llamar al método para pagar la cuota
                      data.pagarCuota(_clienteSeleccionado!);
                    }
                  : null,
              child: const Text('Pagar una cuota'),
            ),
          ],
        ),
      ),
    );
  }
}

class PageThree extends StatelessWidget {
  const PageThree({super.key});

  @override
  Widget build(BuildContext context) {
    var data = Provider.of<Data>(context);
    var clientes = data.clientes;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
                      const Text(
              'Listado de clientes y cuotas',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
    //      const Text('Listado de clientes y cuotas'),
    //      const SizedBox(height: 20),
          clientes.isNotEmpty
              ? Expanded(
                  child: ListView.builder(
                    itemCount: clientes.length,
                    itemBuilder: (context, index) {
                      var cliente = clientes[index];
                      var cuotasPagadas = cliente['cuotasPagadas'];
                      var cuotasRestantes = cliente['cuotasMensuales'] - cuotasPagadas;

                      return Card(
                        child: ListTile(
                          title: Text('Cliente: ${cliente['nombre']}'),
                          subtitle: Text(
                            'Cuotas pagadas: $cuotasPagadas\nCuotas restantes: $cuotasRestantes',
                          ),
                        ),
                      );
                    },
                  ),
                )
              : const Text('No hay clientes disponibles'),
        ],
      ),
    );
  }
}
