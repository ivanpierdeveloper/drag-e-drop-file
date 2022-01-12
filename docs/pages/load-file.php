<?php
    header('Access-Control-Allow-Origin: *'); // IMPORTANTE CORS “Access-Control-Allow-Origin” mancante
    header("Access-Control-Expose-Headers: Content-Length, X-JSON");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept, Accept-Language, X-Authorization");
    header('Access-Control-Max-Age: 86400');
    header('Content-Type: application/json; charset=UTF-8');

    /*
    try {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            //$POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
            // throw new Exception("Messaggio", 200);
            echo '[
                    {
                        "id1" : '.json_encode($_POST['body']).',
                        "id2" : "nil"
                    }
                ]';
        } // ./POST
    } catch(Exception $error) {
        echo '[
            {
                "id1"  : "'.$error->getMessage().'",
                "id2" : "'.$error->getCode().'"
            }
            ]';
    }
    */
    
    try {
        // lettura file della cartella ../docs/avatar/
        // $directory = "../avatar/";
        
        // recupero tutto anche i "." ".."
        // $files = scandir($directory);
                                    ## reimposta gli indici dell'array
        // $files_order_asc = scandir($directory, 1);
/*
        //  recupero tutto ma non i "." ".."
        $scanned_directory = array_diff(scandir($directory), array('..', '.'));
        echo "<hr />NOT ORDER ASC INDICI<hr />";
        echo("<pre>");
            print_r($scanned_directory);
        echo("</pre>");

        
        echo "<hr />ORDER ASC INDICI<hr />";
        echo("<pre>");
                                                 ## reimposta gli indici dell'array
        $scanned_directory_order = array_diff(scandir($directory, 1), array('..', '.'));
            print_r($scanned_directory_order);
        echo("</pre>");
*/        
        
        
        if($_SERVER['REQUEST_METHOD'] === "POST") {
            $directory = "../avatar/";
            $scanned_directory_order = array_diff(scandir($directory, 1), array('..', '.'));
            // throw new Exception("nuovo messaggio METHOD POST", 154);
            $POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
            // function copy
            $id = 1;
            $json = "[";
            for($i = 0; $i < $POST['numImage']; $i++) {
                $file = $_FILES['images'.$i];
                // $temp = $file['tmp_name'];

                ## verifico che il file non sia già presente nella cartella
                $file_receive = $_FILES['images'.$i]['name'];
                
                $exists = false;
                $exists_str = "NO";
                foreach($scanned_directory_order as $key => $file_folder) :
                    if($file_receive === $file_folder) {
                        $exists = true;
                        $exists_str = "YES";
                    } 
                endforeach;

                if($exists) {
                    $uid = uniqid();
                    $file_name = $uid . "-" . $file_receive;
                } else {
                    $file_name = $file_receive;
                }
                $path_folder = "../avatar/".$file_name;
                copy($_FILES['images'.$i]['tmp_name'], $path_folder);
                chmod($path_folder, 777);
                $json .= '{
                    "id": "'.$id.'",
                    "avatar" : "'.$file_name.'",
                    "status" : 200,
                    "numfile": "'.$id.'",
                    "file receive" : "'.$file_receive.'",
                    "exists" : "'.$exists_str.'"
                },';
                $id += 1;
            
            }
            $replace = substr_replace($json, "", -1);
            $replace .= ']';
            // throw new Exception("Messaggio", 200);
            echo $replace;
        } // ./POST
        else {
            throw new Exception("Non è una chiamata POST", 5477);
        }
    } catch (Exception $error) {
        // senza indici
        /* echo '{
            "message" : "'.$error->getMessage().'",
            "code" :     '.$error->getCode().'
        }'; */
        // con indici
        echo '[{
            "message" : "'.$error->getMessage().'",
            "code" :     '.$error->getCode().'
        }]';
    }