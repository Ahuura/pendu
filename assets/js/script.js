$(document).ready(function() {

	// Pick a category and secret word
    var mot = [
        ["JS", "PHP", "JAVA", "HTML", "CSS", "SQL", "JQUERY", "ANGULAR", "REACT", "RUBY","LEARNING", "TUTORIALS", "PYTHON"],
        ["PRAGMATIQUE", "PROCRASTINATION", "BRANQUIGNOL", "MELLIFLU", "PAROXYSME", "PHILATELISTE", "DYSTOPIE", "PETRICHOR", "TROLL", "PROLIXE",
            "DIAPHANE", "BRINDEZINGUE", "HOMERIQUE", "THEBAIDE", "PARASKEVIDEKATRIAPHOBIE", "IMMARCESCIBLE", "OFFUSCATION", "ALACRITE", "DISRUPTIF", "NITESCENCE",
            "METEORISME", "SEIDE", "CALEMBREDAINE", "ADAMANTIN", "STREAKER", "EURYTHMIE", "UBUESQUE"],
        ["TARONATIA", "KEMU", "AHORANGI", "KIAORA", "HAERERA", "ATA", "PO", "RANUI", "WAEHERE", "WHAKAARA",
            "POPA", "TAMAITI", "TAMAHINE", "TEINA", "TUAHINE", "MOTOKA", "KAU", "HIPI", "KUTARERE", "PAIHIKARA",
            "PONGARA", "KAPAO", "PONGO", "KAMATE", "MARAMA", "MAHERE", "TIAKARETE", "HUA", "PUKATUHIPOKA", "HAURANGI",
            "PUKAPUKA", "HUNA", "TUWHERA", "KORERO", "KATA", "TANGI", "PUREI", "HOKO", "NUKU", "AROARO",
            "MURI", "MATAU", "MAUI", "RAINA", "IKA", "RAKAU", "HERU", "MONI", "PEKE", "PIRI",
            "POTO", "KIKI", "KAKAHU", "KAMEHAMEHA", "TAHI", "KAPATA", "WHAKAATU", "HORO", "TURU", "WHAKAATA" ]
]

    var tableauMotAleatoire = mot[Math.floor((Math.random() * mot.length))];
    var motAleatoire = (tableauMotAleatoire[Math.floor((Math.random() * tableauMotAleatoire.length))]);
    console.log(motAleatoire);
    var motAleatoireArray = motAleatoire.split("");

    //affichage des noms de chaque catégorie de mot
    if ($.inArray("LANGAGE PROGRAMMATION", tableauMotAleatoire) > -1) {
        $(".categorie").text("Catégorie Langage de Programmation");
    } else if ($.inArray("WOD DWCCISM", tableauMotAleatoire) > -1) {
        $(".categorie").text("Catégorie WOD DWCCISM");
    } else {
        $(".categorie").text("Mot Maori");
    }


	//Dessinez des carrés pour les mots secrets et masquez les lettres
	for(var i = 0; i < motAleatoire.length; i++) {
        $('#container').append('<div class="lettre ' + i + '"></div>');
        $('#container').find(":nth-child(" + (i + 1) + ")").text(motAleatoireArray[i]);
        $(".lettre").css("color", "green", "width", "100px" , "height", "100px");
    }

	// fonction des boutons
    var fausseSupposition = 0;
    $("button").on("click", function(){
        $(this).addClass("utiliser");
        $(this).prop("desactiver", "true");
        var matchFound = false;

        // Vérification si la lettre cliquée est dans un mot secret
        var joueur = $(this).text();
        for (var i = 0; i < motAleatoire.length; i++) {
            if (joueur === motAleatoire.charAt(i)) {
                $('#container').find(":nth-child(" + (i + 1) + ")").css("color", "#EFEFEF").addClass("gagnant");
                matchFound = true;
            }
        }

        //vérification si gagnant
        var bonneSupposition = [];
        $(".lettre").each(function( index ) {
            if ( $(this).hasClass("gagnant") ) {
                bonneSupposition.push(index);
                if (bonneSupposition.length === motAleatoireArray.length) {
                    $("#container").hide();
                    $("button").prop("desactiver", "true");
                    $(".categorie").text("Bien jouer tu as trouvé le mot mystère");
                    $(".categorie").append("<br><button enabled class='rejouer'>Rejouons?</button>");
                }
            }
        });

        // Si aucune correspondance, augmentez le nombre et ajoutez l'image appropriée
        if (matchFound === false) {
            fausseSupposition += 1;
            $("#hangman").attr("src", "assets/img/" + fausseSupposition + ".png");
        }

        // Si de mauvaises suppositions arrivent à 7, quittez le jeu.
        if (fausseSupposition === 7) {
            $("#container").hide();
            $("button").prop("desactiver", "true");
            $(".categorie").text("Désolé tu as perdu. Le mot mystère était " + motAleatoire);
            $(".categorie").append("<br><button enabled class='rejouer'>Rejouons?</button>");
        }

        // fonction pour rejouer une partie
        $(".rejouer").on("click", function(){
            location.reload();
        });

    }); 

}); 
