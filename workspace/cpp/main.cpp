#include <iostream>
#include <ctime>

using namespace std;

int main(){
  cout << "Hello ASL!" << std::endl;

  time_t timestamp = time(NULL);
  struct tm datetime = *localtime(&timestamp);

  char output[50];

  strftime(output, 50, "%Y-%m-%d", &datetime);
  cout << output << "\n" << std::endl;


  return 0;
}
